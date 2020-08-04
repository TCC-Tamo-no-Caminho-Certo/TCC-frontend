require("lua.reflection")
Assembly.loadAssembly("LuaBuildEvents.SSH, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null")
require("ssh")
local SftpClient = require("ssh.SftpClient")
require("ssh.SftpFile")
require("lua.io")
require("lua.config")
require("lua.system.IAsyncResult")

function cleanFolder(client, remoteFolder)
    print("[SteamsLab] Deleting directory '" .. remoteFolder .. "'...\n")
    local files = client.listDirectory(remoteFolder)
    for fileCount = 1, #files do
        if files[fileCount].isRegularFile == true then
            print("[SteamsLab] Deleting file '" .. files[fileCount].fullName .. "'...\n")
            files[fileCount].delete()
        end
        if files[fileCount].isDirectory == true then
            if files[fileCount].name == "." then goto continue end
            if files[fileCount].name == ".." then goto continue end
            cleanFolder(client, files[fileCount].fullName)
            client.deleteDirectory(files[fileCount].fullName)
            ::continue::
        end
    end
end

function createDirectories(client, remoteFolder, localFolder)
    local directories = Directory.getDirectories(localFolder, "*", SearchOption.AllDirectories)
    for directoryCount = 1, #directories do
        directory = Path.getRelativePath(localFolder, directories[directoryCount])
        directory = string.gsub(directory, "\\", "/")
        directory = Path.combine(remoteFolder, directory)
        directory = string.gsub(directory, "\\", "/")
        if client.exists(directory) == false then
            print("[SteamsLab] Creating directory '" .. directory .. "'...\n")
            client.createDirectory(directory)
        end
    end
end

function copyFileCallback(data)

end

function copyFiles(client, remoteFolder, localFolder)
    local files = Directory.getFiles(localFolder, "*.*", SearchOption.AllDirectories)
    for fileCount = 1, #files do
        filePath = Path.getRelativePath(localFolder, files[fileCount])
        filePath = string.gsub(filePath, "\\", "/")
        filePath = Path.combine(remoteFolder, filePath)
        filePath = string.gsub(filePath, "\\", "/")
        print("[SteamsLab] Uploading file '" .. filePath .. "'...\n")
        local fileStream = FileStream.New(files[fileCount], FileMode.Open, FileAccess.Read, FileShare.Read)
        client.uploadFile(fileStream, filePath)
        fileStream.close()
        fileStream.dispose()
    end
end

function deploy(client, remoteFolder, localFolder)
    cleanFolder(client, remoteFolder)
    createDirectories(client, remoteFolder, localFolder)
    copyFiles(client, remoteFolder, localFolder)
    client.disconnect()
end

function start()
    print("[SteamsLab] Starting frontend remote deployment...\n")
    print("[SteamsLab] Loading config...\n")
    config = FastConfig.New("./lbe/script/deploy-config.yml")
    config.load()
    
    local host = config.getString("host")
    local port = config.getInt("port")
    local username = config.getString("username")
    local password = config.getString("password")
    
    print("[SteamsLab] Connecting to " .. host .. ":" .. tostring(port) .. " ...\n")
    local client = SftpClient.New(host, port, username, password)
    client.connect()
    if client.isConnected == true then
        print("[SteamsLab] Connected\n")
        deploy(client, config.getString("remote-path"), Path.getFullPath(config.getString("local-path")))
    else
        print("[SteamsLab] Failed to connect\n")
    end
end

start()
print("[SteamsLab] Remote deployment finished!\n")