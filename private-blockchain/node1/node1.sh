nohup geth --nousb --datadir=$pwd --syncmode 'full' --port 30310 --miner.gasprice 0 --miner.gastarget 470000000000 --http --http.corsdomain '*' --http.addr 'localhost' --http.port 8545 --http.api admin,eth,miner,net,txpool,personal,web3 --mine --allow-insecure-unlock --unlock "0x369da7512A64D4cf5bd3450654446e062DafbdCE" --password password.txt &    
      
echo "Geth started on node 1" 