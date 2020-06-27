# 运维说明
## 排查问题
发现无法访问网站时，先ssh登入服务器
`ssh root@server_ip`

## 重启Rails Dashboard (主程序)
查看Rails服务是否开启：
`ps -ef|grep 3000`看到

`root     4532     1 15 18:56 pts/1    00:02:43 puma 3.12.0 (tcp://0.0.0.0:3000) [dashboard]`说明Rails是开着的。

先通过执行`kill -9 4532`关掉它。`4532`是进程ID, 每次启动后都不一样。
然后执行如下启动它。
```shell script
cd /root/code-dot-org-staging
nohup bin/dashboard-server  /dev/null 2>&1 &
```

## 重启Pegasus(Sinatra程序，次要程序，通过3099端口访问)
`ps -ef|grep 3090`看到

`root     24387     1  0 Mar29 ?        00:00:54 thin server (0.0.0.0:3090)`
先通过执行`kill -9 24387`关掉它。`24387`是进程ID, 每次启动后都不一样。
然后执行如下启动它。
```shell script
cd /root/code-dot-org-staging/pegasus/
thin start -p 3090 -d
```

## 日志
查看日志：
```shell script
tail -n 500 /var/log/messages
tail -n 500 /root/code-dot-org-staging/nohup.out
tail -f /var/log/nginx/error.log
```

# Upgrade
```shell script
git pull origin master
git checkout -- <the_changed_file> # Use the remote version
```
