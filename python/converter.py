from markitdown import MarkItDown
import re

md = MarkItDown()

resultado = md.convert(r"pdf\Currículo_Felipe_Cidade.pdf")

with open(r"md\Currículo_Felipe_Cidade.md", "w", encoding="utf-8") as f:
   f.write(resultado.text_content)
