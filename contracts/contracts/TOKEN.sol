// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TOKEN is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    
    mapping(address => bool) public bridges;
    
    event BridgeAdded(address indexed bridge);
    event BridgeRemoved(address indexed bridge);
    event TokensBridged(address indexed user, uint256 amount, string destination);

    constructor(address initialOwner) ERC20("HyperLiquid Token", "TOKEN") Ownable(initialOwner) {
        _mint(initialOwner, 100000000 * 10**18);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function addBridge(address bridge) external onlyOwner {
        bridges[bridge] = true;
        emit BridgeAdded(bridge);
    }

    function removeBridge(address bridge) external onlyOwner {
        bridges[bridge] = false;
        emit BridgeRemoved(bridge);
    }

    function bridgeTokens(uint256 amount, string calldata destination) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        emit TokensBridged(msg.sender, amount, destination);
    }

    function bridgeMint(address to, uint256 amount) external {
        require(bridges[msg.sender], "Only authorized bridges can mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}