# Logbook evidence of Web Application Server

- [Generate Public Key using ed25519 encryption](#generate-public-key-using-ed25519-encryption)
- [Creating a new droplet](#creating-a-new-droplet)
- [Connects to VPS (First Time)](#connects-to-vps--first-time-)
- [Creating a non-root user & Granting Administrative Privileges](#creating-a-non-root-user---granting-administrative-privileges)
- [SSH server disables root login](#ssh-server-disables-root-login)
- [Connect to VPS via "shortcut": ssh as2](#connect-to-vps-via--shortcut---ssh-as2)
- [VPS server set to Asia/Brunei time zone](#vps-server-set-to-asia-brunei-time-zone)
- [Installing Apache](#installing-apache)
- [Installing MySQL](#installing-mysql)
- [Installing PHP](#installing-php)
- [Installing Composer](#installing-composer)
- [Create Laravel](#create-laravel)
- [Webserver uses SSL/TLS](#webserver-uses-ssl-tls)
- [User Login Laravel Enable](#user-login-laravel-enable)
- [Enabling email verification:](#enabling-email-verification-)
  * [Database Migration](#database-migration)
- [Copying file to your VPS](#copying-file-to-your-vps)
- [Fail2Ban](#fail2ban)

 ## Generate Public Key using ed25519 encryption
 
 ***Date: 20/09/2021***

  Open Terminal :

  ssh-keygen -t ed25519 -C "19ftt1159@student.pb.edu.bn"

  Set the file name as sop_as2

## Creating a new droplet

***Date: 20/09/2021***

Go to [Digital Ocean](https://www.digitalocean.com/) website

Select:

1. Ubuntu 20.04(LTS)
2. Basic Plan
3. $10/month Droplet Server (Laravel Compatibility)
4. Singapore Data Center Region

5. Authentication:
    1. Select SSH Keys
    2. Copy the sop_as2 Public SSH Key and Paste in the given box and Add SSH Key
    
6. Choose a Hostname and enter "sop-as2"

## Connects to VPS (First Time)

***Date: 20/09/2021***

Open Terminal

Normally I will just run ```ssh root@128.199.194.184``` however as I use ssh key pair that isn't using a default naming scheme such as required by the assignment (sop_as2), I will need to run:

```
ssh -i /Users/hafizzankadir/.ssh/sop_as2 root@128.199.194.184
```

-i option to specify the identity to choose, assuming that I'm inside .ssh folder.

---

To ensure the Server is running with no pending updates, I will need to run:

```
apt update && apt upgrade
```

```
reboot
```

## Creating a non-root user & Granting Administrative Privileges

***Date: 20/09/2021***

Once logged in as root, I’ll be able to add the new user account by running:

```
adduser ftt1159
```

---

To allow the new non-root user to run commands with administrative privileges by putting the word sudo before the command. I need to add these privileges to my new user by adding the user to the sudo group.

I can do this by running:

```
usermod -aG sudo ftt1159
```

---

To enable the non-root user login to the server by using the same SSH Key of the Root user I will need to run:

```
rsync --archive --chown=ftt1159:ftt1159 ~/.ssh /home/ftt1159
```

Now, I will open up a new terminal session and try to log in with new username of the non-root user:

```
ssh -i /Users/hafizzankadir/.ssh/sop_as2 ftt1159@128.199.194.184
```

---

To change non-root user to root user, I will simply run:

```
sudo su
```

## SSH server disables root login

***Date: 20/09/2021***

To disable remote root login, enter the following command:


vi /etc/ssh/sshd_config

```/etc/ssh/sshd_config:
    PermitRootLogin no
```

```
service ssh restart
```

## Connect to VPS via "shortcut": ssh as2

***Date: 20/09/2021***

I will go to my Terminal and go to my ssh file where I store the public key (sop_as1)

```
cd ~/.ssh
```

Then I need to go to the ssh config file to set the shortcut

```
Vim config
```

Click 'i' to insert and enter the following code:

```
Host as2
HostName 128.199.194.184
User ftt1159
IdentityFile ~/.ssh/sop_as2
```

ESC and type 'wq' to save

To try if it is working i will type this following in my terminal:

```
ssh as2
```

## VPS server set to Asia/Brunei time zone

***Date: 20/09/2021***

```
sudo timedatectl set-timezone Asia/Brunei
```

## Installing Apache

***Date: 20/09/2021***

 To ensure my apt cache is updated:

```
sudo apt update
```

Install Apache with:

***Date: 20/09/2021***

```
sudo apt install apache2
```

---

Allows HTTP and HTTPS traffic:

***Date: 20/09/2021***

```
sudo ufw app list
```

To allow incoming HTTP and HTTPS traffic for this server, run:

```
sudo ufw app info "Apache Full"
```

```
sudo ufw allow "Apache Full"
```


The syntax is as follows to open ssh port using ufw command:
```
sudo ufw allow ssh
```

```
sudo ufw allow 22/tcp
```


Now on my browser I will type in my IP adressesed and apache default page will be show up.

## Installing MySQL

***Date: 20/09/2021***

```
sudo apt install mysql-server
```

```
sudo mysql_secure_installation
```

Click Y - To use  password

Click 1 - Choose Strength of Password

Password Secret

Click Y

Click Y

Click N

Click N

Click Y

```
sudo mysql
```

## Installing PHP

***Date: 20/09/2021***

```
sudo apt install zip unzip software-properties-common
```
```
sudo add-apt-repository ppa:ondrej/php
```
```
sudo apt install -y php7.4 php7.4-gd php7.4-mbstring php7.4-xml php-zip
```
```
sudo apt install apache2 libapache2-mod-php7.4
```
```
sudo a2enmod rewrite 
```

## Installing Composer

***Date: 20/09/2021***

```
sudo apt install zip unzip software-properties-common
```

```
sudo apt install composer
```

```
sudo php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

```
sudo php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

```
sudo php composer-setup.php
```

```
sudo php -r "unlink('composer-setup.php');"
```

```
sudo mv composer.phar /usr/local/bin/composer 
```

```
sudo chmod +x /usr/local/bin/composer 
```

## Create Laravel

***Date: 20/09/2021***

```
cd /var/www
```
```
sudo mkdir laravel
```

```
sudo chown -R $USER:$USER /var/www/laravel
sudo chmod -R 755 /var/www/laravel
```

Create  Laravel Project

```
composer create-project laravel/laravel laravel
```

```
sudo chmod -R 755 /var/www/laravel
sudo chmod -R 777 /var/www/laravel/storage
```

Open mysql

```
sudo mysql
```

Then run the following commands:

```
CREATE DATABASE laravel;
CREATE USER 'laravel'@'localhost' IDENTIFIED BY '*Ez141727*';
GRANT ALL ON laravel.* to 'laravel'@'localhost';
FLUSH PRIVILEGES;
quit
```

Noe I'll need to apply the database settings to Laravel's .env file found in /var/www/laravel

```
sudo nano /var/www/laravel/.env
```

Modify the part of the code that has DB_

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=Secret
```

if conf file found in sites-available is not used , run :

```
sudo a2ensite 000-default
```
The command above is a script that will symlink the file into sites-enabled.

Now Modify the conf file found in /etc/apache2/sites-available/000-default.conf

```
sudo nano /etc/apache2/sites-available/000-default.conf
```

```
<VirtualHost *:80>

ServerAdmin webmaster@localhost
DocumentRoot /var/www/laravel/public
ServerName pb.hafizzankadir.tech

<Directory />
 Options FollowSymLinks
 AllowOverride None
</Directory>
<Directory /var/www/laravel>
 AllowOverride All
</Directory>

ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

```

Now I can ensure my laravel is working by going through my domain pb.hafizzankadir.tech

## Webserver uses SSL/TLS

***Date: 20/09/2021***

For now my domain is not using https (Not Secure)

To make a secure encryption I can run  :

```
apt install certbot python3-certbot-apache
```
```
sudo certbot --apache
```
```
sudo systemctl status certbot.timer
```

## User Login Laravel Enable

***Date: 20/09/2021***

I will need to have Node JS Installed  :

```
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
```
```
sudo apt-get install -y nodejs
```

---

Navigate to /var/www/laravel

Run the comand :

```
composer require laravel/breeze --dev
```
```
sudo php artisan breeze:install
```
```
npm install && npm run dev
```

Then the UI for Login and Registration will be available use


## Enabling email verification

***Date: 20/09/2021***

```
cd app/Models
```
```
sudo nano User.php
```

add - implements MustVerifyEmail on 

```class User extends Authenticatable implements MustVerifyEmail```

if we try to register on laravel we will prompt that the permissiom is denied 

so we can debug this by

```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
```

```
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Database Migration

***Date: 20/09/2021***

Navigate back to /var/www/laravel

Install the necessary driver

```
sudo apt install php7.4-mysql
```
```
php artisan migrate
```

Now I can try to Register an account on Laravel

if there is a error such as could not find driver

```
sudo nano /etc/php/7.4/cli/php.ini
```

uncomment ;extension=pdo_mysql.so  by removing the semicolon ';'

---

Now go back to the .env files

```
sudo nano /var/www/laravel/.env
```

Now i will need to have my PB email credential into my Laravel web app's .env file, which later will be
used to send an email via SMTP.

```
MAIL_MAILER=smtp
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USERNAME=19ftt1159@student.pb.edu.bn
MAIL_PASSWORD=Secret
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=19ftt1159@student.pb.edu.bn
MAIL_FROM_NAME="${APP_NAME}"
```

Save  it, and now I can Make  sure its working by Registering my account on the laravel :

Once I register, I can confirm the email is sent via SMTP by looking on my Email,

There will be a verification link that will redirect me back to the dashboard.

Now, verify this by checking the database found in my MySQL server.

In this case im using Sequel Ace

Connection - SSH

```
Name : Laravel
Username : laravel
password : "Password of Mysql"

SSH HOST : 128.199.194.184
SSH USER : ftt1159
SSH Keys : SOP_AS2
```

Now I can connect it and i should be able to see the data of user im registering with.

## Copying file to your VPS

***Date: 20/09/2021***

Go to directory where pblogo.png is located

```
cd /Users/hafizzankadir/Desktop/Pblogo
```

Then I will use scp to secure copy and authenticate connection to the VPS

```
scp -i /Users/hafizzankadir/.ssh/sop_as2 pblogo.png ftt1159@128.199.194.184:~
```

Use mv (move) to move from ~ to /var/www/laravel/public THEN change the permission of the file, pblogo.png by using :

```
mv pblogo.png /var/www/laravel/public/images
```

change the permission of the file :

```
cd /var/www/laravel/public/images
```

```
sudo chmod 664 pblogo.png
```

owner as ftt1159 using:

```
sudo chown $USER:$USER pblogo.png
```

To edit the welcome page I need to go :

```
cd /var/www/laravel/resources/views
```

```
sudo nano welcome.blade.php
```

Then we can insert our image by :

```
<img src="/images/pblogo.png">
```

## Fail2Ban

***Date: 20/09/2021***

To install Fail2ban use this command:

```
sudo apt install fail2ban
```

To check the service status use this command:

```
systemctl status fail2ban
```

To change the default ban settings for all services, make a copy of the jail.conf file.

```
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

```
sudo nano /etc/fail2ban/jail.local
```

to whitelist politenik ip adressed and Set the Ban time and Mmax entry as per requirement:

```
ignoreip = ignoreip = 119.160.132.250
maxretry = 4
bantime  = 120m
```

systemctl restart fail2ban

---

Done!




