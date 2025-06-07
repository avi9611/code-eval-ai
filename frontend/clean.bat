cd project\frontend
if exist node_modules (
  del /f /s /q node_modules > nul
  rmdir /s /q node_modules
)
if exist package-lock.json del package-lock.json