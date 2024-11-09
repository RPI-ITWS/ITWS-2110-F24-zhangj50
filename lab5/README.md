In the VM, I enabled the firewall and allowed access through only 4 ports, 443, 8080, 80 and 22 (SSH). I also tried to automate ZAP using Azure pipelines. This did not work because I did not have access through the Student Cloud registration. I set up an Azure DevOps account, created a project, connected the github to the devOps. I then downloaded zap from the azure marketplace and included it in my pipeline code. The automated CI should have simulated attacks on the website and report it on an HTML file.

After this didn't work, I tried downloading ZAP on the VM through SSH and created a bash script to run on every change to the VM's code. Again, this did not work becuase I was not able to create a Network Security Group (NSG) due to the restrictions that were placed on the account. I also tried enabling bitlocker on the VM incase access falls in the wrong hands, but the disk could again not be modified.

I added a .env to store the password of my VM so that public viewers of the github were not able to see what password I am using for the phpmyadmin. Here, the git ignore was created with the .env file created. The php files using the password was modified to use the
the env file to retrieve the password. I had to create and edit a .env file in the VM's SSH.

I also updated the Linux VM using sudo apt update

HTTPS was already enabled

Resources:
https://stackoverflow.com/questions/67963371/load-a-env-file-with-php
https://medium.com/@srianis/owasp-zap-scanner-integrating-to-azure-devops-release-pipeline-c65daee30da3
https://developercommunity.visualstudio.com/t/the-given-key-was-not-present-in-the-dictionary-wh/486744
