nohup geth --nousb --datadir=$pwd --syncmode 'full' --port 30311 --miner.gasprice 0 --miner.gastarget 470000000000 --http --http.corsdomain '*' --http.addr 'localhost' --http.port 8546 --http.api admin,eth,miner,net,txpool,personal,web3 --mine --allow-insecure-unlock --unlock "0xe2235D122206014A4D70B6Ebb7c6029B8D286358" --password password.txt &    
      
echo "Geth started on node 2"