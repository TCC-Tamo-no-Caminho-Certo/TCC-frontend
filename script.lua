print("[LuaBuildEvents] Starting Frontend Post Pull\n");

require("lua.system");
require("lua.io");

function executeProcess(exec, args)
    print("Executing repository script...\n");
    processStartInfo = ProcessStartInfo.New(exec, args);
    processStartInfo.redirectStandardOutput = true;
    processStartInfo.workingDirectory = Directory.getCurrentDirectory();
    process = Process.New(processStartInfo);
    process.start();
    data = process.standardOutput.readToEnd();
    print(data);
end

print("Running 'npm install'...\n");
executeProcess("npm", "install");

print("[LuaBuildEvents] Finishing Frontend Post Pull\n");