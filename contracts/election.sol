pragma solidity 0.6.1;
pragma experimental ABIEncoderV2;

contract Electioncreation {
    address[] public deployedBallots;

    function startelec(
        string[][] memory candidates,
        string[][] memory position,
        string[] memory department,
        uint256 hour
    ) public {
        for (uint256 i = 0; i < department.length; i++) {
            Ballot newBallot = new Ballot(
                candidates[i],
                position[i],
                department[i],
                msg.sender,
                hour
            );
            // a = newBallot.getAddress();
            deployedBallots.push(address(newBallot));
        }
    }

    function getsDeployedBallots() public view returns (address[] memory) {
        return deployedBallots;
    }
}

contract Ballot {
    struct candidate {
        string name;
        string position;
        uint256 voteCount;
        uint256 creationDate;
        uint256 expirationDate;
    }

    candidate[] public candidates;
    address public manager;
    string public votingDepartment;
    mapping(address => bool) public voters;
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(
        string[] memory candidateNames,
        string[] memory candidatePosition,
        string memory department,
        address creator,
        uint256 amountofHours
    ) public {
        manager = creator;
        votingDepartment = department;
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(
                candidate({
                    name: candidateNames[i],
                    position: candidatePosition[i],
                    voteCount: 0,
                    creationDate: now,
                    expirationDate: now + amountofHours
                })
            );
        }
        //LogAddr(address(this));
    }

    function vote(uint256 index) public {
        require(!voters[msg.sender]);
        //  if(now>candidates[index].expirationDate)
        //  {
        //  revert();
        // }
        candidates[index].voteCount += 1;
        voters[msg.sender] = true;
    }

    function getCandidateName(uint256 index)
        public
        view
        restricted
        returns (string memory)
    {
        require(now > candidates[index].expirationDate);
        return candidates[index].name;
    }

    function getCandidatePosition(uint256 index)
        public
        view
        restricted
        returns (string memory)
    {
        require(now > candidates[index].expirationDate);
        return candidates[index].position;
    }

    function getVoteCount(uint256 index)
        public
        view
        restricted
        returns (uint256)
    {
        //require(now>candidates[index].expirationDate);
        return candidates[index].voteCount;
    }
}
