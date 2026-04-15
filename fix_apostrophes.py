import os, re

BACKSLASH = chr(92)
APOS = chr(39)
ESC_APOS = BACKSLASH + APOS

def fix_frontmatter(content):
    """Fix escaped apostrophes only in the JS frontmatter section (between --- delimiters)."""
    # Split into frontmatter + template
    if not content.startswith('---'):
        return fix_template(content)
    
    # Find the closing ---
    end_idx = content.find('\n---', 3)
    if end_idx == -1:
        return fix_template(content)
    
    frontmatter = content[3:end_idx]
    rest = content[end_idx + 4:]  # skip \n---
    
    fixed_fm = fix_js_content(frontmatter)
    fixed_rest = fix_template(rest)
    
    return '---' + fixed_fm + '\n---' + fixed_rest

def fix_js_content(js):
    """Fix escaped apostrophes in JavaScript code.
    In single-quoted strings containing \': convert string to double-quoted.
    In double-quoted strings: remove the backslash before '.
    """
    result = []
    i = 0
    n = len(js)
    
    while i < n:
        ch = js[i]
        
        # Double-quoted string
        if ch == '"':
            j = i + 1
            s = ['"']
            while j < n:
                if js[j] == BACKSLASH and j + 1 < n:
                    esc = js[j+1]
                    if esc == APOS:
                        s.append(APOS)  # remove backslash, keep apostrophe
                        j += 2
                    else:
                        s.append(js[j])
                        s.append(js[j+1])
                        j += 2
                elif js[j] == '"':
                    s.append('"')
                    j += 1
                    break
                else:
                    s.append(js[j])
                    j += 1
            result.append(''.join(s))
            i = j
        
        # Single-quoted string
        elif ch == APOS:
            j = i + 1
            s_inner = []
            has_escaped_apos = False
            while j < n:
                if js[j] == BACKSLASH and j + 1 < n:
                    esc = js[j+1]
                    if esc == APOS:
                        s_inner.append(APOS)
                        has_escaped_apos = True
                        j += 2
                    else:
                        s_inner.append(js[j])
                        s_inner.append(js[j+1])
                        j += 2
                elif js[j] == APOS:
                    j += 1
                    break
                else:
                    s_inner.append(js[j])
                    j += 1
            inner = ''.join(s_inner)
            if has_escaped_apos:
                # Convert to double quotes
                inner_escaped = inner.replace('"', BACKSLASH + '"')
                result.append('"' + inner_escaped + '"')
            else:
                result.append(APOS + inner + APOS)
            i = j
        
        # Template literal
        elif ch == '`':
            j = i + 1
            s = ['`']
            while j < n:
                if js[j] == BACKSLASH and j + 1 < n:
                    s.append(js[j])
                    s.append(js[j+1])
                    j += 2
                elif js[j] == '`':
                    s.append('`')
                    j += 1
                    break
                else:
                    s.append(js[j])
                    j += 1
            result.append(''.join(s))
            i = j
        
        else:
            result.append(ch)
            i += 1
    
    return ''.join(result)

def fix_template(template):
    """Fix \' in the HTML/JSX template part.
    In JSX text content (not inside strings/attributes): \' -> '
    In JS expressions {}: use fix_js_content
    In HTML attributes "...": remove backslash before '
    """
    result = []
    i = 0
    n = len(template)
    
    while i < n:
        ch = template[i]
        
        # JSX expression { ... }
        if ch == '{':
            # Find matching closing brace (simple, non-nested handling)
            depth = 1
            j = i + 1
            expr_chars = ['{']
            while j < n and depth > 0:
                if template[j] == '{':
                    depth += 1
                elif template[j] == '}':
                    depth -= 1
                expr_chars.append(template[j])
                j += 1
            expr = ''.join(expr_chars)
            # Fix JS inside the expression (skip the outer braces)
            fixed_inner = fix_js_content(expr[1:-1])
            result.append('{' + fixed_inner + '}')
            i = j
        
        # HTML double-quoted attribute
        elif ch == '"':
            j = i + 1
            s = ['"']
            while j < n and template[j] != '"':
                if template[j] == BACKSLASH and j + 1 < n and template[j+1] == APOS:
                    s.append(APOS)
                    j += 2
                else:
                    s.append(template[j])
                    j += 1
            if j < n:
                s.append('"')
                j += 1
            result.append(''.join(s))
            i = j
        
        # Standalone \' in JSX text -> '
        elif ch == BACKSLASH and i + 1 < n and template[i+1] == APOS:
            result.append(APOS)
            i += 2
        
        else:
            result.append(ch)
            i += 1
    
    return ''.join(result)

base = 'C:/Users/agarg/amalficoast-travel/src/pages/it-it'
count = 0
errors = []
for root, dirs, files in os.walk(base):
    for f in files:
        if f.endswith('.astro'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            
            if ESC_APOS not in content:
                continue
            
            try:
                new_content = fix_frontmatter(content)
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as fh:
                        fh.write(new_content)
                    count += 1
                    rel = path[len(base)+1:]
                    print(f'Fixed: {rel}')
            except Exception as e:
                errors.append((path, str(e)))

print(f'\nTotal files fixed: {count}')
if errors:
    print(f'Errors: {len(errors)}')
    for p, e in errors:
        print(f'  {p}: {e}')
