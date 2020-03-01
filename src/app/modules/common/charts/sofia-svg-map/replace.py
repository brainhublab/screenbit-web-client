import fileinput
import re

fn = "test.html"

counter = 0

pattern = re.compile("\s*<title>(.*)</title>")

for line in fileinput.input(fn, inplace=1):
    if pattern.match(line):
        newline = re.sub(r'<title>(.*)</title>',r'<title id="{}">\1</title>'.format(counter), line.rstrip())
        counter += 1
        print(newline)
    else:
        print(line)
