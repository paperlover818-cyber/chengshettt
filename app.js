const q = [
{id:'a1',type:'单选题',chapter:1,topic:'程序与算法',title:'以下关于算法的说法，哪一项最恰当？',opts:['只要能编译，就是正确算法','算法是解决问题的明确步骤，还需考虑正确性','算法只能用流程图表示','数据结构与算法无关'],answer:1,explain:'算法可以用自然语言、伪代码、流程图等描述；程序能编译不代表算法正确。'},
{id:'a2',type:'单选题',chapter:1,topic:'C程序基础',title:'关于C程序，正确的是？',opts:['预处理指令必须以分号结束','程序从任意函数开始执行','标准程序的 main 返回 int','变量可以先使用再声明'],answer:2,explain:'程序从 main 开始；预处理指令通常不加分号，变量要先声明。'},
{id:'a3',type:'单选题',chapter:2,topic:'数据类型',title:'在C语言中，表达式 5 / 2 的值是？',opts:['2','2.5','3','编译错误'],answer:0,explain:'两个操作数都是整数，执行整数除法，结果向零截断。'},
{id:'a4',type:'单选题',chapter:2,topic:'字符与编码',title:"字符表达式 '7' - '0' 的值是？",opts:['字符 7','整数 7','整数 55','字符串 7'],answer:1,explain:'数字字符编码连续，相减得到整数7。字符常量与字符串常量不同。'},
{id:'a5',type:'单选题',chapter:2,topic:'输入输出',title:'有 char c; 为跳过前导空白读取一个字符，应使用？',opts:['scanf("%c", c);','scanf("%c", &c);','scanf(" %c", &c);','scanf("%s", &c);'],answer:2,explain:'格式串中的空白会跳过前导空白；%c 本身不会跳过空白，参数必须是地址。'},
{id:'a6',type:'单选题',chapter:2,topic:'浮点数',title:'以下哪一项正确？',opts:['所有十进制小数都能被二进制浮点数精确表示','3.0f 默认是 double','浮点比较的误差阈值应结合问题规模选择','浮点除法结果永远是整数'],answer:2,explain:'浮点数精度有限，误差比较需要结合数值规模、绝对误差或相对误差。'},
{id:'a7',type:'单选题',chapter:3,topic:'选择结构',title:'在嵌套 if 中，没有花括号改变结构时，else 匹配哪个 if？',opts:['第一个 if','最近的尚未匹配的 if','条件为真的 if','所有 if'],answer:1,explain:'else 与最近的未匹配 if 结合；使用花括号可避免歧义。'},
{id:'a8',type:'单选题',chapter:3,topic:'循环',title:'for 循环体执行 continue 后，接下来执行什么？',opts:['直接退出循环','先执行更新表达式，再判断条件','直接执行下一次循环体','退出整个程序'],answer:1,explain:'for 中 continue 跳到更新表达式，之后重新判断条件。'},
{id:'a9',type:'单选题',chapter:4,topic:'数组',title:'定义 int a[5] 后，合法下标范围是？',opts:['1 到 5','0 到 5','0 到 4','1 到 4'],answer:2,explain:'长度为5的数组下标是0至4。越界访问是未定义行为。'},
{id:'a10',type:'单选题',chapter:4,topic:'二分查找',title:'二分查找的基本前提是？',opts:['数组必须有序','数组长度必须为偶数','数组不能有重复值','数组必须包含目标'],answer:0,explain:'二分查找利用有序性缩小范围；允许有重复值，但普通写法不保证返回第一个。'},
{id:'a11',type:'单选题',chapter:4,topic:'字符串',title:'char s[10] = "abc"; 则 strlen(s) 与 sizeof(s) 分别是？',opts:['3 和 10','4 和 10','3 和 3','4 和 4'],answer:0,explain:'strlen 不计结束符；此处 sizeof 数组得到全部10字节。'},
{id:'a12',type:'单选题',chapter:4,topic:'字符串',title:'两个以零结尾的字符串内容相等时，strcmp(a,b) 返回？',opts:['1','0','-1','两者长度'],answer:1,explain:'strcmp 返回0表示内容相等；其他结果只应依赖正负。'},
{id:'r1',type:'程序阅读题',chapter:2,topic:'自增与赋值',title:'写出输出，数字之间用一个空格分隔。',code:'int x = 4;\nint a = x++;\nint b = ++x;\nprintf("%d %d %d", a, b, x);',answer:'4 6 6',explain:'x++ 先产生旧值4，再令x为5；++x 先令x为6，再产生6。'},
{id:'r2',type:'程序阅读题',chapter:2,topic:'类型转换',title:'写出输出。',code:'int a = 5, b = 2;\nprintf("%d %.1f", a / b, (double)a / b);',answer:'2 2.5',explain:'前者整数除法；后者在除法前将a转换为double。'},
{id:'r3',type:'程序阅读题',chapter:3,topic:'循环追踪',title:'写出输出。',code:'int i, s = 0;\nfor (i = 1; i <= 5; ++i) {\n    if (i % 2 == 0) continue;\n    s += i;\n}\nprintf("%d %d", i, s);',answer:'6 9',explain:'累加1、3、5得到9；循环退出时i为6。'},
{id:'r4',type:'程序阅读题',chapter:3,topic:'switch贯穿',title:'写出输出。',code:'int x = 2;\nswitch (x) {\n    case 1: printf("A");\n    case 2: printf("B");\n    case 3: printf("C"); break;\n    default: printf("D");\n}',answer:'BC',explain:'从case 2进入，没有break，继续执行case 3，然后退出。'},
{id:'r5',type:'程序阅读题',chapter:4,topic:'数组与循环',title:'写出输出。',code:'int a[4] = {1, 2};\nfor (int i = 1; i < 4; ++i)\n    a[i] += a[i - 1];\nprintf("%d %d %d %d", a[0], a[1], a[2], a[3]);',answer:'1 3 3 3',explain:'部分初始化使后两项为0；每一项累加已经更新过的前一项。'},
{id:'r6',type:'程序阅读题',chapter:4,topic:'二维数组',title:'写出输出。',code:'int a[2][3] = {{1, 2}, {3}};\nprintf("%d %d %d", a[0][2], a[1][0], a[1][2]);',answer:'0 3 0',explain:'二维数组部分初始化时，未提供的元素初始化为0。'},
{id:'f1',type:'程序填空题',chapter:3,topic:'条件表达式',title:'填写条件，判断 x 在闭区间 [10, 20] 内。',code:'if (____________________) printf("YES");',answer:'x >= 10 && x <= 20',alts:['10 <= x && x <= 20'],explain:'两个比较必须分别进行，再用 && 连接。'},
{id:'f2',type:'程序填空题',chapter:3,topic:'数字处理',title:'填入表达式，取非负整数 n 的个位。',code:'int digit = __________;',answer:'n % 10',explain:'对10取余得到个位；n /= 10 可去掉个位。'},
{id:'f3',type:'程序填空题',chapter:4,topic:'二分查找',title:'闭区间二分查找中，填入循环条件。',code:'int left = 0, right = n - 1;\nwhile (____________) {\n    /* 缩小闭区间 */\n}',answer:'left <= right',explain:'闭区间仅在 left > right 时为空；left == right 仍有一个元素需要检查。'},
{id:'f4',type:'程序填空题',chapter:4,topic:'冒泡排序',title:'升序冒泡排序第 i 轮（i 从1开始），填入内层条件。',code:'for (int i = 1; i < n; ++i)\n    for (int j = 0; ____________; ++j)\n        if (a[j] > a[j + 1]) { /* 交换 */ }',answer:'j < n - i',explain:'每轮确定一个末尾位置；j+1 必须仍在未排序范围内。'},
{id:'f5',type:'程序填空题',chapter:4,topic:'字符串',title:'填入结束条件，遍历字符串 s 的所有有效字符。',code:'for (int i = 0; ____________; ++i)\n    putchar(s[i]);',answer:"s[i] != '\\0'",alts:['s[i]'],explain:'遇到字符串结束符停止；它不属于有效字符。'},
{id:'e1',type:'程序改错题',chapter:3,topic:'循环边界',title:'将错误的整行替换为正确的 for 循环头，要求输出 a[0] 到 a[n-1]。',code:'for (int i = 0; i <= n; ++i)\n    printf("%d ", a[i]);',answer:'for (int i = 0; i < n; ++i)',explain:'i == n 时访问越界，应使用 i < n。'},
{id:'e2',type:'程序改错题',chapter:2,topic:'输入格式',title:'改写 scanf 整行，正确读取 double 变量 x。',code:'double x;\nscanf("%f", &x);',answer:'scanf("%lf", &x);',explain:'scanf 的 %f 对应 float*，%lf 对应 double*。'},
{id:'e3',type:'程序改错题',chapter:4,topic:'字符串比较',title:'改写 if 行，使其判断两个字符串内容相等。假设已包含 string.h。',code:'if (a == b)\n    printf("same");',answer:'if (strcmp(a, b) == 0)',explain:'数组名用于表达式时通常转换为指针；比较内容应调用 strcmp。'},
{id:'e4',type:'程序改错题',chapter:3,topic:'整数除法',title:'改写赋值行，正确计算整数 a、b 的浮点平均值。',code:'double avg;\navg = (a + b) / 2;',answer:'avg = (a + b) / 2.0;',alts:['avg = (double)(a + b) / 2;'],explain:'使用浮点操作数，使除法按浮点进行；特别大整数还需考虑加法溢出。'},
{id:'a13',type:'单选题',chapter:1,topic:'编译过程',title:'C 源程序通常经过哪些步骤才能执行？',opts:['编辑、编译和链接','只需编辑','只需链接','先执行再编译'],answer:0,explain:'源代码经过编译与链接生成可执行程序；编译成功不保证运行结果正确。'},
{id:'a14',type:'单选题',chapter:2,topic:'输入输出',title:'若 int x; 执行 scanf("%d", &x)，输入为 12abc，则 x 的值是？',opts:['12','0','无法读取','abc'],answer:0,explain:'%d 读取前导的整数部分，遇到不属于整数的字符停止；abc 留在输入流中。'},
{id:'a15',type:'单选题',chapter:3,topic:'短路求值',title:'若 int x = 0; 求值 x != 0 && 10 / x > 1 时，结果是什么？',opts:['0，右侧不求值','1','一定除以零','编译错误'],answer:0,explain:'&& 的左侧为假时不计算右侧，因此这里不会执行除法。'},
{id:'r7',type:'程序阅读题',chapter:3,topic:'do-while循环',title:'写出输出。',code:'int i = 3;\ndo { printf("%d", i); i++; } while (i < 3);',answer:'3',explain:'do-while 先执行循环体，再检查条件，因此至少执行一次。'},
{id:'r8',type:'程序阅读题',chapter:4,topic:'数组插入',title:'写出输出。',code:'int a[5] = {1, 3, 4, 5};\nfor (int i = 4; i > 1; --i) a[i] = a[i - 1];\na[1] = 2;\nprintf("%d %d %d %d %d", a[0], a[1], a[2], a[3], a[4]);',answer:'1 2 3 4 5',explain:'插入时从后向前移动，避免覆盖尚未移动的元素。'},
{id:'f6',type:'程序填空题',chapter:4,topic:'数组删除',title:'删除下标 k 处元素，补全左移赋值。假设 0 ≤ k < n。',code:'for (int i = k; i < n - 1; ++i)\n    a[i] = __________;\n--n;',answer:'a[i + 1]',explain:'将后面的元素依次向前移动，最后有效长度减一。'},
{id:'e5',type:'程序改错题',chapter:4,topic:'输入边界',title:'改写 scanf 整行，读取最多 9 个非空白字符并保留结束符。',code:'char s[10];\nscanf("%s", s);',answer:'scanf("%9s", s);',explain:'%9s 限制最多读9个字符，数组第10个位置留给结束符。'},
{id:'p1',test:'digits',type:'编程题',chapter:3,topic:'循环与数字',title:'各位数字之和',desc:'输入一个 0 到 1000000000 的整数，输出它的十进制各位数字之和。例：输入 4279，输出 22。',starter:'#include <stdio.h>\n\nint main(void) {\n    int n, sum = 0;\n    scanf("%d", &n);\n    /* 在此完成 */\n    printf("%d\\n", sum);\n    return 0;\n}',explain:'循环累加 n % 10，再执行 n /= 10；0 的各位和为0。'},
{id:'p2',test:'prime',type:'编程题',chapter:3,topic:'素数判断',title:'判断素数',desc:'输入一个 0 到 1000000 的整数；是素数输出 YES，否则输出 NO。',starter:'#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    /* 在此完成 */\n    return 0;\n}',explain:'小于2不是素数；尝试从2到 n/i 的因子，找到整除因子即不是素数。'},
{id:'p3',test:'max',type:'编程题',chapter:4,topic:'数组与最大值',title:'最大值及第一次出现位置',desc:'先输入 n（1 ≤ n ≤ 100），再输入 n 个整数。输出最大值及其第一次出现的序号（从1开始），以空格分隔。',starter:'#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    /* 在此完成 */\n    return 0;\n}',explain:'用第一个数初始化最大值与位置；仅在新数严格大于最大值时更新，保留首次位置。'},
{id:'p4',test:'words',type:'编程题',chapter:4,topic:'字符串与状态',title:'统计单词数',desc:'输入一行不超过200个字符的文本。单词定义为连续的英文字母序列，其余字符均为分隔符。输出单词个数。',starter:'#include <stdio.h>\n\nint main(void) {\n    char s[202];\n    if (!fgets(s, sizeof s, stdin)) return 0;\n    /* 在此完成 */\n    return 0;\n}',explain:'维护是否处于单词中；从非字母进入字母时计数，遇到非字母时清除状态。'}
];
q.push(
{id:'f7',type:'程序填空题',chapter:2,topic:'输入格式',title:'写出完整的 scanf 语句，跳过空白后读取字符 c。',code:'char c;\n____________________',answer:'scanf(" %c", &c);',explain:'格式串中 %c 前的空格跳过前导空白。'},
{id:'f8',type:'程序填空题',chapter:2,topic:'格式输入',title:'填入格式符，读取 double 类型变量 x。',code:'scanf("________", &x);',answer:'%lf',explain:'scanf 的 %lf 对应 double 类型变量的地址。'},
{id:'f9',type:'程序填空题',chapter:3,topic:'循环',title:'填入更新语句，去掉非负整数 n 的个位。',code:'while (n > 0) {\n    sum += n % 10;\n    __________;\n}',answer:'n /= 10',alts:['n = n / 10'],explain:'整数除以10向零截断，去掉个位。'},
{id:'f10',type:'程序填空题',chapter:3,topic:'素数',title:'填入条件，判断 n 能否被 i 整除。',code:'if (____________) prime = 0;',answer:'n % i == 0',alts:['0 == n % i'],explain:'余数为0表示整除。'},
{id:'f11',type:'程序填空题',chapter:3,topic:'递推',title:'先更新前 i 项和 p，再将 p 累加到 s；填入第一行。',code:'__________;\ns += p;',answer:'p += i',alts:['p = p + i'],explain:'p 表示当前的 1+2+...+i。'},
{id:'f12',type:'程序填空题',chapter:4,topic:'顺序查找',title:'填入未找到时的判断条件。',code:'for (i = 0; i < n && a[i] != key; ++i) ;\nif (__________) printf("Not found");',answer:'i == n',alts:['n == i'],explain:'循环到达 n 意味着所有有效元素均未匹配。'},
{id:'f13',type:'程序填空题',chapter:4,topic:'二分查找',title:'升序数组闭区间二分查找，a[mid] 小于 key 时更新左界。',code:'if (a[mid] < key) left = __________;',answer:'mid + 1',explain:'mid 已被排除，左界移到 mid+1。'},
{id:'f14',type:'程序填空题',chapter:4,topic:'二分查找',title:'半开区间 [left,right) 二分查找，a[mid] 大于 key 时更新右界。',code:'if (a[mid] > key) right = __________;',answer:'mid',explain:'半开区间右端不包含在内，因此设为 mid。'},
{id:'f15',type:'程序填空题',chapter:4,topic:'数组插入',title:'从后向前移动元素，填入右侧表达式。',code:'for (int i = n; i > k; --i)\n    a[i] = __________;',answer:'a[i - 1]',explain:'向后移动时从末尾开始，避免覆盖尚未移动的元素。'},
{id:'f16',type:'程序填空题',chapter:4,topic:'字符串',title:'在当前长度 len 的位置写入字符串结束符。',code:'s[len] = __________;',answer:"'\\0'",alts:['0'],explain:'结束符是值为0的字符，必须预留容量。'},
{id:'f17',type:'程序填空题',chapter:4,topic:'字符统计',title:'对小写字母 ch，填入其在长度26的计数数组中的下标。',code:'count[__________]++;',answer:"ch - 'a'",explain:'a 对应0，z 对应25；使用前确认 ch 是小写字母。'},
{id:'f18',type:'程序填空题',chapter:3,topic:'循环回绕',title:'填入表达式，使下标 i 在 0 到 n-1 间循环前进。假设 n > 0。',code:'i = __________;',answer:'(i + 1) % n',explain:'最后一个下标加一后对 n 取余回到0。'},
{id:'p5',test:'sumarray',type:'编程题',chapter:4,topic:'数组遍历',title:'统计正数与总和',desc:'输入 n（1 至100）及 n 个整数，输出其中正数的个数和全部整数的和，以空格分隔。数值绝对值不超过1000。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'循环读入，每个数累加；大于0时计数加1。'},
{id:'p6',test:'search',type:'编程题',chapter:4,topic:'顺序查找',title:'首次出现的位置',desc:'输入 n（1 至100）、n 个整数和 key。输出 key 首次出现的下标（从0开始）；不存在输出 -1。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'从左往右比较，第一次相等时记录下标；未找到输出 -1。'},
{id:'p7',test:'sort',type:'编程题',chapter:4,topic:'冒泡排序',title:'整数升序排序',desc:'输入 n（1 至100）和 n 个整数，按升序输出所有元素，以空格分隔。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'冒泡排序每轮比较相邻元素，将较大值逐步移到末尾。'},
{id:'p8',test:'letters',type:'编程题',chapter:4,topic:'字符统计',title:'统计字母、数字与其他字符',desc:'输入一行最多200个字符，输出英文字母、数字和其他字符的个数，以空格分隔。末尾换行符不计入。',starter:'#include <stdio.h>\nint main(void) {\n    char s[202];\n    if (!fgets(s, sizeof s, stdin)) return 0;\n    /* 在此完成 */\n    return 0;\n}',explain:'遍历至结束符或换行符，按英文字母、数字、其他分类计数。'},
{id:'p9',test:'series',type:'编程题',chapter:3,topic:'递推累加',title:'嵌套求和',desc:'输入 n（1 至100），计算 1 + (1+2) + ... + (1+2+...+n)，输出整数结果。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'每轮先将 i 加入 p，再将 p 加入 s。'},
{id:'p10',test:'insert',type:'编程题',chapter:4,topic:'数组插入',title:'在指定位置插入',desc:'输入 n（1 至99）、n 个整数，再输入 k 和 x（0 ≤ k ≤ n）。在下标 k 处插入 x，输出新数组，元素以空格分隔。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'从下标 n 开始向后移动，写入 a[k] 后长度加一。'}
);
q.push(
{id:'f19',type:'程序填空题',chapter:3,topic:'累加',title:'输入 n 个整数，求其和。填入正确的循环条件。',code:'int sum = 0, x;\nfor (int i = 0; __________; ++i) {\n    scanf("%d", &x);\n    sum += x;\n}',answer:'i < n',alts:['n > i'],explain:'从0开始计数，i取0到n-1，共执行n次。'},
{id:'f20',type:'程序填空题',chapter:3,topic:'最大值',title:'填入条件，更新目前为止的最大值。',code:'if (__________) max = x;',answer:'x > max',alts:['max < x'],explain:'新值严格大于当前最大值时才更新。'},
{id:'f21',type:'程序填空题',chapter:3,topic:'循环',title:'填入表达式，求正整数 n 的最后两位。',code:'int last = __________;',answer:'n % 100',explain:'对100取余得到最后两位组成的整数。'},
{id:'f22',type:'程序填空题',chapter:3,topic:'累乘',title:'填入初始值，使循环计算 n!（假设结果不溢出）。',code:'int product = _____;\nfor (int i = 1; i <= n; ++i) product *= i;',answer:'1',explain:'乘积的初值应为1，也使0!得到1。'},
{id:'f23',type:'程序填空题',chapter:4,topic:'数组遍历',title:'填入条件，统计数组中严格大于0的元素。',code:'for (int i = 0; i < n; ++i)\n    if (__________) ++count;',answer:'a[i] > 0',alts:['0 < a[i]'],explain:'0既不是正数也不是负数，因此使用严格大于。'},
{id:'f24',type:'程序填空题',chapter:4,topic:'二维数组',title:'填入表达式，累加方阵主对角线上的元素。',code:'for (int i = 0; i < n; ++i)\n    sum += __________;',answer:'a[i][i]',explain:'主对角线的行下标和列下标相同。'},
{id:'f25',type:'程序填空题',chapter:4,topic:'二维数组',title:'n 阶方阵中，填入副对角线元素的列下标。',code:'sum += a[i][__________];',answer:'n - 1 - i',explain:'副对角线行列下标之和为 n-1。'},
{id:'f26',type:'程序填空题',chapter:4,topic:'字符串',title:'填入循环条件，计算以空字符结尾的字符串长度。',code:'int len = 0;\nwhile (__________) ++len;',answer:"s[len] != '\\0'",alts:['s[len]'],explain:'遇到结束符停止，长度不计结束符。'},
{id:'f27',type:'程序填空题',chapter:4,topic:'冒泡排序',title:'升序冒泡排序中，填入需要交换相邻元素时的条件。',code:'if (__________) {\n    int t = a[j]; a[j] = a[j+1]; a[j+1] = t;\n}',answer:'a[j] > a[j+1]',alts:['a[j+1] < a[j]'],explain:'前一个数大于后一个数时交换，使较大的数向后移动。'},
{id:'f28',type:'程序填空题',chapter:3,topic:'循环与数字',title:'逆序构造正整数的数字，填入更新表达式。',code:'while (n > 0) {\n    reversed = __________;\n    n /= 10;\n}',answer:'reversed * 10 + n % 10',explain:'原结果左移一位，再接上当前个位；需保证结果不溢出。'},
{id:'r9',type:'程序阅读题',chapter:3,topic:'嵌套循环',title:'写出输出。',code:'int count = 0;\nfor (int i = 1; i <= 3; ++i)\n    for (int j = 0; j < i; ++j) ++count;\nprintf("%d", count);',answer:'6',explain:'内层分别执行1、2、3次，共6次。'},
{id:'r10',type:'程序阅读题',chapter:3,topic:'循环与break',title:'写出输出。',code:'int i;\nfor (i = 1; i <= 6; ++i) {\n    if (i % 4 == 0) break;\n}\nprintf("%d", i);',answer:'4',explain:'i为4时退出循环，break后不执行for更新。'},
{id:'r11',type:'程序阅读题',chapter:4,topic:'字符串',title:'写出输出。假设已包含 string.h。',code:'char s[8] = "hello";\ns[2] = \'\\0\';\nprintf("%zu %zu", strlen(s), sizeof s);',answer:'2 8',explain:'结束符提前到下标2，因此长度为2；数组容量仍为8字节。'},
{id:'r12',type:'程序阅读题',chapter:4,topic:'数组',title:'写出输出。',code:'int a[] = {4, 1, 3};\nint t = a[0]; a[0] = a[2]; a[2] = t;\nprintf("%d %d %d", a[0], a[1], a[2]);',answer:'3 1 4',explain:'交换首尾元素，中间元素不变。'},
{id:'p11',test:'reverse_digits',type:'编程题',chapter:3,topic:'数字逐位处理',title:'整数数字逆序',desc:'输入一个 0 至 1000000000 的整数，将其十进制数字逆序后作为整数输出。例如输入 1200 输出 21；输入 0 输出 0。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'循环取个位并将它接到结果末尾，再去掉输入的个位。'},
{id:'p12',test:'matrix_diagonal',type:'编程题',chapter:4,topic:'二维数组',title:'方阵对角线之和',desc:'输入 n（1 至 20）及 n 行 n 列整数（绝对值不超过1000），输出主对角线元素之和与副对角线元素之和，用空格分隔。中心元素在两项中各计一次。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'主对角线满足 i == j，副对角线满足 i + j == n - 1。'},
{id:'p13',test:'delete_at',type:'编程题',chapter:4,topic:'数组删除',title:'删除指定位置',desc:'输入 n（1 至 100）、n 个整数和下标 k（0 ≤ k < n），删除下标 k 的元素，按原顺序输出剩余元素并用空格分隔；无剩余元素时输出空行。',starter:'#include <stdio.h>\nint main(void) {\n    /* 在此完成 */\n    return 0;\n}',explain:'从k开始把后一个元素向前移动，有效长度减1。'},
{id:'p14',test:'count_vowels',type:'编程题',chapter:4,topic:'字符统计',title:'统计元音字母',desc:'输入一行最多200个字符，统计其中英文字母 a、e、i、o、u 的出现次数，不区分大小写，输出总数。',starter:'#include <stdio.h>\nint main(void) {\n    char s[202];\n    if (!fgets(s, sizeof s, stdin)) return 0;\n    /* 在此完成 */\n    return 0;\n}',explain:'遍历字符串，对大小写元音进行判断，其他字符不计数。'}
);
const types=['全部练习','单选题','程序阅读题','程序改错题','程序填空题','编程题'];
const chapters=['全部章节','第 1 章','第 2 章','第 3 章','第 4 章'];
let state={}; try{state=JSON.parse(localStorage.getItem('c-midterm-v1')||'{}')}catch(e){}
let type='全部练习',chapter=0,wrongOnly=false;
let selectedQuestion=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>localStorage.setItem('c-midterm-v1',JSON.stringify(state));
const normalize=s=>s.trim().split(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g).map((part,i)=>i%2?part:part.replace(/\s+/g,' ').replace(/\s*([()\[\];,+*/<>=!&|%-])\s*/g,'$1')).join('');
document.addEventListener('input',e=>{
 const el=e.target;
 const id=el.id?.startsWith('input-')?el.id.slice(6):(el.matches('input[type="radio"]')?el.name:null);
 if(id && q.some(x=>x.id===id)){state[id]={...state[id],input:el.value};save()}
});
function render(){
 document.querySelector('#nav').innerHTML=types.map(t=>`<button class="nav-item ${type===t?'active':''}" data-type="${t}">${t}<span>${t==='全部练习'?q.length:q.filter(x=>x.type===t).length}</span></button>`).join('');
 document.querySelector('#chapters').innerHTML=chapters.map((c,i)=>`<button class="nav-item ${chapter===i?'active':''}" data-chapter="${i}">${c}</button>`).join('');
 document.querySelector('#mobileType').innerHTML=types.map(t=>`<option ${t===type?'selected':''}>${t}</option>`).join('');
 document.querySelector('#mobileChapter').innerHTML=chapters.map((c,i)=>`<option value="${i}" ${chapter===i?'selected':''}>${c}</option>`).join('');
 const done=q.filter(x=>state[x.id]?.done).length, correct=q.filter(x=>state[x.id]?.correct).length;
 document.querySelector('#overall').textContent=`已完成 ${done} / ${q.length}`;
 document.querySelector('#title').textContent=type;
 document.querySelector('#subtitle').textContent=chapter?`${chapters[chapter]} · 题型与知识点训练`:'按题型和章节检验你的掌握情况';
 document.querySelector('#summary').innerHTML=`<strong>${correct}</strong> / ${q.length}<br>已答正确`;
 const list=q.filter(x=>(!selectedQuestion||x.id===selectedQuestion)&&(type==='全部练习'||x.type===type)&&(!chapter||x.chapter===chapter)&&(!wrongOnly||(state[x.id]?.done&&!state[x.id]?.correct)));
 document.querySelector('#count').textContent=`${list.length} 道题目`;
 document.querySelector('#empty').hidden=!!list.length;
 document.querySelector('#questions').innerHTML=list.map(x=>{
  const st=state[x.id]||{}, idx=q.indexOf(x)+1;
  let control=x.opts?`<div class="options">${x.opts.map((o,i)=>`<label class="option"><input type="radio" name="${x.id}" value="${i}" ${String(st.input)===String(i)?'checked':''}><span>${String.fromCharCode(65+i)}. ${esc(o)}</span></label>`).join('')}</div>`:x.test?`<textarea spellcheck="false" id="input-${x.id}" aria-label="代码">${esc(st.input??x.starter)}</textarea><p class="hint">本机执行：仅运行你信任的代码。测试用例不是完整正确性证明。</p>`:`<input class="answer" id="input-${x.id}" value="${esc(st.input||'')}" placeholder="输入答案" aria-label="答案">`;
  let feedback=st.done?`<div class="result ${st.correct?'':'fail'}"><strong>${st.correct?'回答正确':'尚未通过'}</strong>${st.detail||''}<p>${esc(x.explain)}</p>${!st.correct&&!x.test?`<p>参考答案：${esc(x.opts?String.fromCharCode(65+x.answer)+'. '+x.opts[x.answer]:x.answer)}</p>`:''}</div>`:'';
  const links=knowledge.flatMap((g,gi)=>g.points.map((p,pi)=>p[2].includes(x.id)?`<button class="knowledge-link" data-point="${gi}-${pi}">${esc(p[0])}</button>`:'')).join('');
  return `<article class="question" id="${x.id}"><div class="meta"><span class="num">${String(idx).padStart(2,'0')}</span><span class="tag">${x.type}</span><span>第 ${x.chapter} 章 · ${x.topic}</span>${st.done?`<span class="status ${st.correct?'good':'bad'}">${st.correct?'已答对':'待复习'}</span>`:''}</div><h2>${esc(x.title)}</h2>${x.desc?`<p>${esc(x.desc)}</p>`:''}${x.code?`<pre>${esc(x.code)}</pre>`:''}${control}<div class="actions"><button class="primary" data-submit="${x.id}">${x.test?'运行测试':'提交答案'}</button><button class="secondary" data-reveal="${x.id}">查看解析</button></div>${links?`<div class="related">相关知识：${links}</div>`:''}${feedback}</article>`;
 }).join('');
}
document.addEventListener('click',async e=>{
 const b=e.target.closest('button'); if(!b)return;
 if(b.dataset.type){selectedQuestion=null;type=b.dataset.type;render();return} if(b.dataset.chapter!==undefined){selectedQuestion=null;chapter=+b.dataset.chapter;render();return}
 if(b.id==='mapView'){showView(true);return} if(b.id==='practiceView'){selectedQuestion=null;showView(false);render();return}
 if(b.dataset.exercise){selectedQuestion=b.dataset.exercise;type='全部练习';chapter=0;wrongOnly=false;document.querySelector('#wrongOnly').checked=false;showView(false);render();document.getElementById(selectedQuestion)?.scrollIntoView({block:'start'});return}
 if(b.dataset.point){showView(true);const point=document.getElementById('point-'+b.dataset.point);point?.closest('.map-chapter')?.setAttribute('open','');point?.setAttribute('open','');point?.scrollIntoView({block:'center'});return}
 if(b.id==='reset'){if(confirm('确定清除所有练习记录和代码吗？')){state={};save();render()}return}
 const id=b.dataset.submit||b.dataset.reveal;if(!id)return; const x=q.find(z=>z.id===id);
 if(b.dataset.reveal){const el=document.createElement('div');el.className='result';el.innerHTML=`<strong>解析</strong><p>${esc(x.explain)}</p>${!x.test?`<p>参考答案：${esc(x.opts?String.fromCharCode(65+x.answer)+'. '+x.opts[x.answer]:x.answer)}</p>`:''}`;b.closest('.question').append(el);b.disabled=true;return}
 let input=x.opts?document.querySelector(`input[name="${id}"]:checked`)?.value:document.querySelector(`#input-${id}`).value;
 if(input===undefined||!input.trim()){alert('请先填写答案。');return}
 if(x.test){if(!confirm('代码会以当前用户权限在本机运行，资源限制不是安全沙箱。仅运行你信任的代码。继续吗？'))return;b.disabled=true;b.textContent='测试中…';try{const r=await fetch('/api/test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:x.test,code:input})});const data=await r.json();let detail=data.error?`<p>${esc(data.error)}</p><pre>${esc(data.detail)}</pre>`:data.results.map((v,i)=>`<p>用例 ${i+1}：${v.pass?'通过':'未通过'}${v.status?' · '+esc(v.status):''}<br>输入：${esc(v.input)}<br>期望：${esc(v.expected)}；实际：${esc(v.actual||'（无输出）')}</p>`).join('');state[id]={done:true,correct:!!data.passed,input,detail};}catch(err){state[id]={done:true,correct:false,input,detail:'<p>无法连接本地测试服务，请通过提供的地址访问网页。</p>'}}}else{let correct=x.opts?Number(input)===x.answer:[x.answer,...(x.alts||[])].some(a=>normalize(a)===normalize(input));state[id]={done:true,correct,input};}
 save();render();document.getElementById(id)?.scrollIntoView({block:'nearest'});
});
document.querySelector('#mobileType').addEventListener('change',e=>{selectedQuestion=null;type=e.target.value;render()});
document.querySelector('#mobileChapter').addEventListener('change',e=>{selectedQuestion=null;chapter=+e.target.value;render()});
document.querySelector('#wrongOnly').addEventListener('change',e=>{selectedQuestion=null;wrongOnly=e.target.checked;render()});
function showView(map){document.querySelector('#knowledge').hidden=!map;document.querySelector('#practice').hidden=map;document.querySelector('#mapView').classList.toggle('active',map);document.querySelector('#practiceView').classList.toggle('active',!map)}
function renderMap(){
 document.querySelector('#map').innerHTML=knowledge.map((g,gi)=>`<details class="map-chapter"><summary>第 ${g.chapter} 章 · ${esc(g.title)} <span>${g.points.length} 个考点</span></summary><div class="branches">${g.points.map((p,pi)=>`<details class="map-point" id="point-${gi}-${pi}"><summary>${esc(p[0])}<span>${p[2].length?`${p[2].length} 道相关题`:'暂无专项题'}</span></summary><p>${esc(p[1])}</p><div class="map-exercises">${p[2].map(id=>{const x=q.find(item=>item.id===id);return x?`<button data-exercise="${id}">${esc(x.type)} · ${esc(x.title)}</button>`:''}).join('')||'<span>暂无对应题目，请结合复习笔记练习。</span>'}</div></details>`).join('')}</div></details>`).join('');
}
// Each node points to the relevant detailed sections of the companion notes.
const noteSections=[
 ['2.1','2.1','2.2','2.2','2.2'],
 ['3.1','3.1','3.1','3.2','3.2','3.2','3.2','3.2','4.1','4.2','4.2','4.2'],
 ['5.1','5.1','5.2','5.2','5.2','5.3','5.3','5.3','5.3','5.3'],
 ['6.1','6.1','6.1','6.2','6.2','6.3','6.3','6.4','7.1','7.2','7.2','7.3','7.3','7.3']
];
async function addDetailedNotes(){
 try {
  const response=await fetch('期中复习知识点.md');
  if(!response.ok)throw new Error('notes unavailable');
  const source=await response.text();
  const sections={};
  for(const match of source.matchAll(/^### (\d+\.\d+) ([^\n]+)\n([\s\S]*?)(?=^#{2,3} |$(?![\s\S]))/gm)) sections[match[1]]={title:match[2],body:match[3].trim()};
  noteSections.forEach((chapter,gi)=>chapter.forEach((section,pi)=>{
   const note=sections[section],point=document.getElementById(`point-${gi}-${pi}`);
   if(!note||!point)return;
   const detail=document.createElement('details'); detail.className='note-detail';
   const summary=document.createElement('summary'); summary.textContent=`详细复习：${section} ${note.title}`;
   const body=document.createElement('pre'); body.className='note-text'; body.textContent=note.body;
   detail.append(summary,body); point.insertBefore(detail,point.querySelector('.map-exercises'));
  }));
 } catch(e) { document.querySelector('.map-intro').textContent+=' 详细笔记加载失败，请通过本地服务打开网页。'; }
}
renderMap();
addDetailedNotes();
render();
