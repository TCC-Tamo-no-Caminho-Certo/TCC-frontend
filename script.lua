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

-- Filename and directory blacklist
function isBlackListed(path)
  return false
end
  
-- Create base directory
distPath = "/home/frontend/dist"
if Directory.exists(distPath) == false then
  Directory.createDirectory(distPath)
end
  
-- Create directories
outputDirectory = Path.combine(Directory.getCurrentDirectory(), "build");
outputDirectories = Directory.getDirectories(outputDirectory, "*", SearchOption.AllDirectories)
for key,value in ipairs(outputDirectories) do
  directoryReplace = value:gsub(outputDirectory, "")
  if isBlackListed(directoryReplace) == true then
    print("Blacklisted directory: " .. Path.getFileName(directoryReplace) .. "\n")
    goto continue
  end
  fixedDirectory = Path.combine(distPath, directoryReplace)
  if Directory.exists(fixedDirectory) == false then
    print("Creating directory: " .. fixedDirectory .. "\n")
    Directory.createDirectory(fixedDirectory)
  end
  ::continue::
end
  
-- Copy files
outputFiles = Directory.getFiles(outputDirectory, "*.*", SearchOption.AllDirectories)
for key,value in ipairs(outputFiles) do
  fileNameReplace = value:gsub(outputDirectory, "")
  if isBlackListed(Path.getFileName(fileNameReplace)) == true then
    print("Blacklisted file: " .. Path.getFileName(fileNameReplace) .. "\n")
    goto continue
  end
  fixedFileName = Path.combine(distPath, fileNameReplace)
  print("Copying file: " .. fixedFileName .. "\n")
  File.copy(value, fixedFileName, true)
  ::continue::
end

print("[LuaBuildEvents] Finishing Frontend Post Pull\n")