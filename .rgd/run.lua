-- Version 1.1
if branch == "development" then
    status = run("npm", "install")
    setStatus(status)
    status = run("npm", "run build")
    setStatus(status)
    status = run("rm", "-rfv /home/rgd/deploy/dev/frontend/")
    setStatus(status)
    status = run("cp", "-rv ./build/ /home/rgd/deploy/dev/frontend/")
    setStatus(status)
    status = run("rm", "-rfv /home/rgd/deploy/dev/landing/")
    setStatus(status)
    status = run("cp", "-rv ./landing/ /home/rgd/deploy/dev/landing/")
    setStatus(status)
elseif branch == "master" then
    status = run("npm", "install")
    setStatus(status)
    status = run("npm", "run build")
    setStatus(status)
    status = run("rm", "-rfv /home/rgd/deploy/dist/frontend/")
    setStatus(status)
    status = run("cp", "-rv ./build/ /home/rgd/deploy/dist/frontend/")
    setStatus(status)
    status = run("rm", "-rfv /home/rgd/deploy/dist/landing/")
    setStatus(status)
    status = run("cp", "-rv ./landing/ /home/rgd/deploy/dist/landing/")
    setStatus(status)
end
