status = run("npm", "install")
setStatus(status)
status = run("npm", "run build")
setStatus(status)
status = run("rm", "-rfv /home/rgd/deploy/frontend/")
setStatus(status)
status = run("cp", "-rv ./build/ /home/rgd/deploy/frontend/")
setStatus(status)
-- 1.0