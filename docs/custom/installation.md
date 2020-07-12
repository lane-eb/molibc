## 目前主要问题
* 许多图片还没有经过缓存。缓存后加载速度可加快。
* 许多js还没有经过压缩，导致初次加载时太慢。
* Rails没有进行多进程处理，对并发处理不理想。
* 注册和登录不能用。因为csrf问题。

# OSX Installation
```shell script
brew install redis
brew install rbenv
rbenv install 2.5.0
brew install coreutils
brew install sqlite
brew install enscript
brew install gs
brew install mysql@5.7
brew install imagemagick
brew cask install phantomjs
brew install openssl
```

When install nvm, you need to use https://github.com/edc/bass because https://github.com/nvm-sh/nvm/issues/303.  
Look at edc's answer.

`npm install -g yarn@1.16.0`

## Install project
Look at the `# CentOS Installation` part to see how to get the full source code `staging.zip` (6GB).
```shell script
cd dashboard
gem install bundler:1.17.1
bundle install # You will got some erros. Then fix these errors with:

gem update --system
gem install libv8 -v 3.16.14.15 -- --with-system-v8
gem install mysql2 -v '0.5.2' -- --with-cflags=\"-I/usr/local/opt/openssl/include\" --with-ldflags=\"-L/usr/local/opt/openssl/lib\"
For therubyracer bundle issue:
brew install v8@3.15
gem install libv8 -v 'YOUR_VERSION' -- --with-system-v8
gem install therubyracer -v 'YOUR_VERSION' -- --with-v8-dir=/usr/local/opt/v8@3.15

bundle install
cd /path/to/project/root
bundle exec rake install:hooks
bundle exec rake install
bundle exec rake build (Only run at the first time!)
```

# CentOS Installation
* `cat /proc/cpuinfo`, `top` make sure at least 4 core 8G memory.

* Download `curl -O -L https://github.com/code-dot-org/code-dot-org/archive/staging.zip`. 
This file is more that 6GB, but normally it won't take you a long time because of the high brand-width of server.
You may need this file too in you local machine. But if you don't have a high brand-width in local, 
you can download it in server first, then 
`nohup rsync -avP  root@server_ip:/root/staging.zip ./coding.zip 2>&1 &`  

* At most time you needn't to escape the GFW in the server because when you need some big packages, 
you can download it in your local machine and then upload the package by `SCP`.  

## Install Redis
* Follow https://linuxize.com/post/how-to-install-and-configure-redis-on-centos-7/ to install Redis.
{% highlight bash %}
sudo yum install -y epel-release yum-utils
sudo yum install -y http://rpms.remirepo.net/enterprise/remi-release-7.rpm
sudo yum-config-manager --enable remi
sudo yum install -y redis
sudo systemctl start redis
sudo systemctl enable redis
sudo systemctl status redis
{% endhighlight %}

## Install rbenv
```shell script
yum install -y git bzip2 openssl-devel readline-devel zlib-devel
wget https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer -O rbenv-installer
sh rbenv-installer
vim ~/.bashrc # Add the next line to it:
export PATH=/root/.rbenv/bin:$PATH
# If it is too slow to run `rbenv install --verbose 2.5.0`, then you can run:
curl https://cache.ruby-lang.org/pub/ruby/2.5/ruby-2.5.0.tar.bz2 -O ruby-2.5.0.tar.bz2
in this machine or in your local. Then copy this file to ~/.rbenv/cache

~/.rbenv/bin/rbenv init # Then follow the instruction, append:
eval "$(rbenv init -)"
to ~/.bash_profile

rbenv global 2.5.0
ruby -v # Test
```

## Install node and yarn
```shell script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash # Install nvm
nvm install 8.17.0
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
sudo yum install -y yarn
yarn --version
```

## Install MySQL
* Visit https://dev.mysql.com/downloads/mysql/5.6.html?os=31 and select 5.7 and download `(mysql-5.7.29-1.el7.x86_64.rpm-bundle.tar)`.

Don't use a low version of mysql! You must install mysql version over 5.7.8! Or you will get an json syntax error!

```shell script
tar xvf mysql-5.7.29-1.el7.x86_64.rpm-bundle.tar
yum localinstall -y mysql-community-common-5.7.29-1.el7.x86_64.rpm # If you got error: conflicts with file from package mariadb-libs, plese refer to https://stackoverflow.com/questions/27113696/mysql-wont-install-in-centos-due-to-conflict-with-mariadb
yum localinstall -y mysql-community-libs-5.7.29-1.el7.x86_64.rpm
yum localinstall -y mysql-community-devel-5.7.29-1.el7.x86_64.rpm
yum localinstall -y mysql-community-client-5.7.29-1.el7.x86_64.rpm
yum localinstall -y mysql-community-server-5.7.29-1.el7.x86_64.rpm
rpm -qa | grep mysql
systemctl enable mysqld
systemctl start mysqld
systemctl status mysqld
mysql -u root # You should login successfully without password. If you meet `ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)`, then:
vim /etc/my.cnf # Add: 
skip-grant-tables # after [mysqld] 
systemctl restart mysqld
```

## Install Others
```shell script
yum install -y enscript
yum install -y sqlite-devel
```

## Install phantomjs
According to https://www.liquidweb.com/kb/how-to-install-phantomjs-on-centos-7/
```shell script
yum install -y fontconfig
yum install -y freetype-devel
yum install -y fontconfig-devel
```

## Install ImageMagick
https://tecadmin.net/install-imagemagick-on-centos-rhel/
```shell script
yum install -y gcc php-devel php-pear
yum install -y ImageMagick
yum install -y ImageMagick-devel # If you got error of conficting with ghostscript, please run `yum remove ghostscript`.
```

## Install Project
```shell script
vim ~/.gemrc # Add this line:
gem: --no-document

unzip staging.zip

cd dashboard
gem install bundler:1.17.1
# gem update --system
bundle install --verbose # Maybe you sometimes you need to change the source to https://gems.ruby-china.com
cd /path/to/project/root
git init

bundle exec rake install:hooks
# This step will take a long time. So remember to read https://github.com/code-dot-org/code-dot-org/blob/staging/SETUP.md#overview first.
# If you got error, you can `mysql> drop database dashboard_development; drop database dashboard_test;`, then `systemctl restart mysqld`.  
bundle exec rake install
bundle exec rake build # Only run once in the first time and may take a little long time.

bin/dashboard-server
curl -iL http://localhost-studio.code.org:3000/

cd pegasus
thin start -p 3090 -d
```

## Install Nginx
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7
```shell script
$ yum install epel-release -y
$ yum install -y nginx
$ systemctl start nginx # 'restart', 'stop' are also available.
$ systemctl status nginx # Vew nginx status
$ vim /etc/nginx/nginx.conf
```

* Need to pay attention to SecurityGroup. Make sure inbound port 80, 443(if https), and 3099 is allowed.
* Then add a A record to your server IP.
* Visit your domain, you can see your website is accessible. But many files like `http://example.com/assets/js/code-studio.js` are 404.
That's because these files not still not exist in `dashboard/public/blockly`. 
You can run `npm run build`(later I will tell you how to build and deploy with compressed js like min.js) the generate the js files if `apps/build/package` doesn't have the js you need.
Then run `ln -s /root/code-dot-org-staging/apps/build/package blockly` if `dashboard/public/blockly` not exists. 

## Change code to make website work well
* Now you can see all links are not `example.com` but `localhost-studio.code.org`. 
You should change: `config.yml.erb` set `override_dashboard: example.com`.

* Add `optimize_webpack_assets: true` to `locals.yml` and then run `npm run build:dist`.
