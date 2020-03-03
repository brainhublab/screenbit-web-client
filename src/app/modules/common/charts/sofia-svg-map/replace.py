import fileinput
import re

fn = "sofia-svg-map.component.copy.html"

counter = 0

pattern = re.compile("\s*<title(.*)>")

for line in fileinput.input(fn, inplace=1):
    if pattern.match(line):
        newline = re.sub(r'<title(.*)',r'<title id="{}"\1'.format(counter), line.rstrip())
        counter += 1
        print(newline)
    else:
        print(line)
