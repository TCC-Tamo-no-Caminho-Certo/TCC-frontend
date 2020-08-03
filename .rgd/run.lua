-- Version 1.3.2

function executeWithStatus(filename, args)
    status = run(filename, args)
    setStatus(status)
    return status != 0
end

function runScript()
    if branch == "development" then
        if executeWithStatus("npm", "install") then return end
        if executeWithStatus("npm", "run build --node-flags --max-old-space-size=512") then return end
        if executeWithStatus("rm", "-rfv /home/rgd/deploy/dev/frontend/") then return end
        if executeWithStatus("cp", "-rv ./build/ /home/rgd/deploy/dev/frontend/") then return end
        if executeWithStatus("rm", "-rfv /home/rgd/deploy/dev/landing/") then return end
        if executeWithStatus("cp", "-rv ./landing/ /home/rgd/deploy/dev/landing/") then return end
    elseif branch == "master" then
        if executeWithStatus("npm", "install") then return end
        if executeWithStatus("npm", "run build --node-flags --max-old-space-size=512") then return end
        if executeWithStatus("rm", "-rfv /home/rgd/deploy/dist/frontend/") then return end
        if executeWithStatus("cp", "-rv ./build/ /home/rgd/deploy/dist/frontend/") then return end
        if executeWithStatus("rm", "-rfv /home/rgd/deploy/dist/landing/") then return end
        if executeWithStatus("cp", "-rv ./landing/ /home/rgd/deploy/dist/landing/") then return end
    end
end

runScript()
