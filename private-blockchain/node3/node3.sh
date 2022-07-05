nohup geth --nousb --datadir=$pwd --syncmode 'full' --port 30312 --miner.gasprice 0 --miner.gastarget 470000000000 --http --http.corsdomain '*' --http.addr 'localhost' --http.port 8547 --http.api admin,eth,miner,net,txpool,personal,web3 --mine --allow-insecure-unlock --unlock "0x36EBdc41b7D57703E45447260C36D114098fcc56" --password password.txt &    
      
echo "Geth started on node 3" 