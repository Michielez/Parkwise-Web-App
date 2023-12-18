# Parkwise web-app

## Instal the right packages

```bash
npm install
```

## Run it local

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.

## Deploy it

[Official documentation of next.js](https://nextjs.org/docs/app/building-your-application/deploying) 

## Deploy it on DigitalOcean

[Documentation for deploying on DigitalOcean](https://docs.digitalocean.com/developer-center/deploying-a-next.js-application-on-a-digitalocean-droplet/)

## Create a droplet

Go to your DigitalOcean account and create a droplet. You should go for a Ubuntu 20.04 (LTS) x64 droplet. You can choose the lowest configuration possible if you want to test it out. Ofcourse upgrade the droplet if you want to use it for high traffic.

## Connect to the droplet
```bash
ssh root@<ip-of-droplet>
```
## More swapstorage for building
   
If you're using the lowest possible configuration for the droplet you'll next.js build will kill itself, because it doesn't have enough ram to run the build command. In order to fix this issue we'll asign more swap storage to the droplet.

execute the following commands:

```bash
sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1
```

## Setting up the droplet
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm nginx
```
## Configuring Nginx
```bash
sudo nano /etc/nginx/sites-available/nextjs
```
Paste the following code in the file and change YOUR_IP_ADDRESS to the ip address of your droplet:
```bash
server {
  listen 80;
  server_name YOUR_IP_ADDRESS;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Save and close the file. Create a symbolic link to enable the configuration:

```bash	
sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
```
Test the Nginx configuration for any syntax errors:
```bash
sudo nginx -t
```
If successful, restart Nginx:

```bash
sudo service nginx restart
```

## Deploy the next.js app
```bash
cd /var/www
git clone your-repo-url-to-your-next.js-app
cd your-next.js-app
npm install --legacy-peer-deps # --legacy-peer-deps is used because there are some packages that are in beta
npm run build # this will take a while
npm run start
```
Now go to the http://ip-of-your-droplet and you should see your next.js app running.

## Setting up PM2 Process Manager

We ran npm start from within our Droplet. Sometimes this command may stop running for reasons like the server restarted or it needed to install updates. We will use a tool called PM2 to make sure that our Next.js application is always running. PM2 will even restart the Next.js application if it goes down.

To install PM2 globally run:

```bash
npm install -g pm2
```

Navigate to the next.js

```bash
cd /var/www/your-next.js-app
```

Start the Next.js application with PM2:

```bash
pm2 start npm --name "<your-next-js-application-name>" -- start
```

To ensure PM2 starts on boot:

```bash
pm2 startup 
```

Save the current PM2 processes:

```bash
pm2 save
```

Congratulations! You have now deployed your Next.js application to a DigitalOcean Droplet.

## Update your application

If you made any changes to your next.js application you can update it by doing the following:

```bash
cd /var/www/your-next.js-app
git pull
```
If you have added or changes any dependencies you should run the following:
  
```bash
npm install --legacy-peer-deps
```
Now build the application again:

```bash
npm run build
```

Restart the application:  
(you can check the name of your application by running pm2 list)
```bash
pm2 restart <your-next-js-application-name>
```

Check status:
```bash
pm2 status
```

Your application should now be updated. Reload the page to see the changes happen.
dd