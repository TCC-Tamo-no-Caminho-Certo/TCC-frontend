require("lua.system")
require("lua.io")

-- Create base directory
distPath = "/home/frontend/landing"
outputPath = "/home/frontend/lbe/dev_frontend/landing/"
if Directory.exists(distPath) == false then
  Directory.createDirectory(distPath)
end

-- Delete old data
oldFiles = Directory.getFiles(distPath, "*.*", SearchOption.AllDirectories)
for key,value in ipairs(oldFiles) do
  File.delete(value)
end
oldDirectories = Directory.getDirectories(distPath, "*", SearchOption.AllDirectories)
for key,value in ipairs(oldDirectories) do
  Directory.delete(value, true)
end

-- Create directories
outputDirectory = Path.combine(Directory.getCurrentDirectory(), "landing");
outputDirectories = Directory.getDirectories(outputDirectory, "*", SearchOption.AllDirectories)
for key,value in ipairs(outputDirectories) do
  directoryReplace = value:gsub(outputPath, "")
  fixedDirectory = Path.combine(distPath, directoryReplace)
  if Directory.exists(fixedDirectory) == false then
    print("Creating directory: " .. fixedDirectory .. "\n")
    Directory.createDirectory(fixedDirectory)
  end
end

-- Copy files
outputFiles = Directory.getFiles(outputDirectory, "*.*", SearchOption.AllDirectories)
for key,value in ipairs(outputFiles) do
  fileNameReplace = value:gsub(outputPath, "")
  fixedFileName = Path.combine(distPath, fileNameReplace)
  print("Copying file: " .. fixedFileName .. "\n")
  File.copy(value, fixedFileName, true)
end