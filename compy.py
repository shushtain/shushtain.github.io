paths = [
    "index.html",
    "404.html",
    "design/index.html",
    "design/kharkivpride/index.html",
    "design/logofolio/index.html",
    "design/refusion/index.html",
    "cv/index.html",
]

for path in paths:

    # read template
    t = open(f"_templates/{path}", encoding="utf8")
    template = t.read()
    t.close()

    # split template into parts
    parts = template.split("{%}")

    # prepare template
    template = ""

    # iterate through parts
    for i in range(len(parts)):
        if "{$}" in parts[i]:
            # clean
            parts[i] = parts[i].replace("{$}", "")
            parts[i] = parts[i].strip()

            # split dynamic parts into variables
            vars = parts[i].split("{|}")

            # clean variables
            for x in range(len(vars)):
                vars[x] = vars[x].strip()

            # read block for the part
            b = open(f"_blocks/{vars[0]}.html", encoding="utf8")
            parts[i] = b.read()
            b.close()

            # split block into molecules
            molecules = parts[i].split("{%}")

            # prepare part
            parts[i] = ""

            # vars counter
            var_counter = 1

            # iterate through molecules
            for j in range(len(molecules)):
                if "{$}" in molecules[j]:
                    # clean
                    molecules[j] = molecules[j].replace("{$}", "")
                    molecules[j] = molecules[j].strip()

                    # assign variable to the molecule
                    molecules[j] = vars[var_counter]
                    var_counter += 1

                # combine molecules into part
                parts[i] += molecules[j]

        # combine parts into template
        template += parts[i]

    t = open(path, "w", encoding="utf8")
    t.write(template)
    t.close()

print("ALL GOOD")
