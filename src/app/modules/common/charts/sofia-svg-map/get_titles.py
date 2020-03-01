import fileinput
import re

fn = "titles.xml"

counter = 0

pattern = re.compile('\s*<title id="\d*">.*</title>')

for line in fileinput.input(fn, inplace=1):
    if pattern.match(line):
      print(line)
