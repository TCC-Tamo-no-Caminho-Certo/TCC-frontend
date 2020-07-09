print("[LuaBuildEvents] Starting Frontend Post Pull\n")

require("lua.system")
require("lua.io")

function executeProcess(exec, args)
    print("Executing repository script...\n")
    processStartInfo = ProcessStartInfo.New(exec, args)
    processStartInfo.redirectStandardOutput = true
    processStartInfo.workingDirectory = Directory.getCurrentDirectory()
    process = Process.New(processStartInfo)
    process.start()
    data = process.standardOutput.readToEnd()
    print(data)
end

print("Running 'npm install'...\n")
executeProcess("npm", "install")

print("Running 'npm run build'...\n")
executeProcess("npm", "run build")
 
-- Create base directory
distPath = "/home/frontend/dist"
outputPath = "/home/frontend/lbe/dev_frontend/build/"
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
  Directory.delete(value)
end

-- Create directories
outputDirectory = Path.combine(Directory.getCurrentDirectory(), "build");
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

require("landing")

print("[LuaBuildEvents] Finishing Frontend Post Pull\n")