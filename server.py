from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import subprocess
import tempfile
import resource

ROOT = Path(__file__).resolve().parent
CASES = {
    'digits': [('4279\n', '22'), ('0\n', '0'), ('1000000000\n', '1'), ('99999\n', '45')],
    'prime': [('2\n', 'YES'), ('1\n', 'NO'), ('97\n', 'YES'), ('49\n', 'NO'), ('100\n', 'NO')],
    'max': [('5\n-8 -2 -2 -9 -3\n', '-2 2'), ('1\n-10\n', '-10 1'), ('4\n3 4 5 9\n', '9 4')],
    'words': [('Hello, world!\n', '2'), ('  \n', '0'), ('a--B c123d\n', '4'), ('one\n', '1')],
    'sumarray': [('5\n-1 0 2 3 -4\n', '2 0'), ('1\n0\n', '0 0'), ('3\n-9 -2 -1\n', '0 -12')],
    'search': [('5\n4 3 4 1 4\n4\n', '0'), ('3\n1 2 3\n9\n', '-1'), ('1\n7\n7\n', '0')],
    'sort': [('5\n3 -1 3 0 2\n', '-1 0 2 3 3'), ('1\n-7\n', '-7'), ('4\n4 3 2 1\n', '1 2 3 4')],
    'letters': [('aB12 !\n', '2 2 2'), ('\n', '0 0 0'), ('123\n', '0 3 0')],
    'series': [('1\n', '1'), ('3\n', '10'), ('100\n', '171700')],
    'insert': [('3\n1 2 3\n1 9\n', '1 9 2 3'), ('1\n7\n0 5\n', '5 7'), ('2\n1 2\n2 3\n', '1 2 3')],
    'reverse_digits': [('1200\n', '21'), ('0\n', '0'), ('123456789\n', '987654321'), ('1000000000\n', '1')],
    'matrix_diagonal': [('1\n5\n', '5 5'), ('2\n1 2\n3 4\n', '5 5'), ('3\n1 2 3\n4 5 6\n7 8 9\n', '15 15'), ('2\n-1 0\n0 -2\n', '-3 0')],
    'delete_at': [('1\n7\n0\n', ''), ('4\n1 2 3 4\n0\n', '2 3 4'), ('4\n1 2 3 4\n3\n', '1 2 3'), ('4\n1 2 3 4\n1\n', '1 3 4')],
    'count_vowels': [('Hello WORLD!\n', '3'), ('AEIOU aeiou\n', '10'), ('bcdf 123\n', '0'), ('\n', '0')],
}

def limit():
    resource.setrlimit(resource.RLIMIT_CPU, (2, 2))
    resource.setrlimit(resource.RLIMIT_FSIZE, (1024 * 1024, 1024 * 1024))
    resource.setrlimit(resource.RLIMIT_NOFILE, (32, 32))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != '/api/test':
            self.send_error(404); return
        host = self.headers.get('Host', '')
        expected = f'127.0.0.1:{self.server.server_port}'
        if (host != expected or self.headers.get('Origin') != f'http://{expected}'
                or self.headers.get_content_type() != 'application/json'):
            self.send_error(403); return
        try:
            length = int(self.headers.get('Content-Length', 0))
            if length <= 0 or length > 30000: raise ValueError('请求长度无效')
            data = json.loads(self.rfile.read(length))
            cases = CASES[data['id']]
            code = data['code']
            with tempfile.TemporaryDirectory(prefix='c-study-') as folder:
                source = Path(folder) / 'main.c'
                binary = Path(folder) / 'main'
                source.write_text(code, encoding='utf-8')
                build = subprocess.run(['clang', '-std=c11', '-Wall', '-Wextra', str(source), '-lm', '-o', str(binary)], capture_output=True, text=True, timeout=10)
                if build.returncode:
                    result = {'error': '编译失败', 'detail': build.stderr[:5000]}
                else:
                    results = []
                    for inp, expected in cases:
                        try:
                            run = subprocess.run([str(binary)], input=inp, capture_output=True, text=True, timeout=2, cwd=folder, preexec_fn=limit)
                            actual = run.stdout.strip()
                            passed = run.returncode == 0 and actual.split() == expected.split()
                            results.append({'input': inp.strip(), 'expected': expected, 'actual': actual[:1000], 'pass': passed, 'status': '运行异常' if run.returncode else ''})
                        except subprocess.TimeoutExpired:
                            results.append({'input': inp.strip(), 'expected': expected, 'actual': '', 'pass': False, 'status': '运行超时'})
                    result = {'results': results, 'passed': all(x['pass'] for x in results), 'warnings': build.stderr[:2000]}
        except Exception as e:
            result = {'error': '无法执行测试', 'detail': str(e)}
        payload = json.dumps(result, ensure_ascii=False).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    print(f'http://127.0.0.1:{port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
