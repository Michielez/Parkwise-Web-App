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

[Official documentation](https://nextjs.org/docs/app/building-your-application/deploying) 

## Deploy it on DigitalOcean

[Bron](https://docs.digitalocean.com/developer-center/deploying-a-next.js-application-on-a-digitalocean-droplet/)

## Create a droplet
## Connect to the droplet
   ssh root@<ip-of-droplet>
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

sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/

Test the Nginx configuration for any syntax errors:

sudo nginx -t

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
