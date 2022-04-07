/**
 *Submitted for verification at BscScan.com on 2022-02-10
*/

pragma solidity 0.8.11;

// SPDX-License-Identifier: Unlicensed
interface IERC20 {
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    function isContract(address account) internal view returns (bool) {
        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            codehash := extcodehash(account)
        }
        return (codehash != accountHash && codehash != 0x0);
    }

    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }

    function functionCall(address target, bytes memory data)
        internal
        returns (bytes memory)
    {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                value,
                "Address: low-level call with value failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(
            address(this).balance >= value,
            "Address: insufficient balance for call"
        );
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(
        address target,
        bytes memory data,
        uint256 weiValue,
        string memory errorMessage
    ) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{value: weiValue}(
            data
        );
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

library SafeERC20 {
    using Address for address;

    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transfer.selector, to, value)
        );
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transferFrom.selector, from, to, value)
        );
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IERC20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.approve.selector, spender, value)
        );
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(
            data,
            "SafeERC20: low-level call failed"
        );
        if (returndata.length > 0) {
            // Return data is optional
            // solhint-disable-next-line max-line-length
            require(
                abi.decode(returndata, (bool)),
                "SafeERC20: ERC20 operation did not succeed"
            );
        }
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract Ownable is Context {
    address private _owner;
    address private _previousOwner;
    uint256 private _lockTime;
    address private newOwner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    modifier onlyNewOwner() {
        require(msg.sender == newOwner, "Only the newOwner can call this");

        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
        _previousOwner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(
            _newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        newOwner = _newOwner;
    }

    function revokeOwnershipTransfer() external onlyOwner {
        newOwner = _owner;
    }

    function acceptOwnership() external virtual onlyNewOwner {
        _owner = newOwner;
        _previousOwner = address(0);
        emit OwnershipTransferred(_owner, newOwner);
    }

    function geUnlockTime() public view returns (uint256) {
        return _lockTime;
    }

    //Locks the contract for owner for the amount of time provided
    function lock(uint256 time) public virtual onlyOwner {
        _previousOwner = _owner;
        _owner = address(0);
        _lockTime = block.timestamp + time;
        emit OwnershipTransferred(_owner, address(0));
    }

    //Unlocks the contract for owner when _lockTime is exceeds
    function unlock() public virtual {
        require(
            _previousOwner == msg.sender,
            "You don't have permission to unlock"
        );
        require(block.timestamp > _lockTime, "Contract is locked ");
        emit OwnershipTransferred(_owner, _previousOwner);
        _owner = _previousOwner;
    }
}

interface IUniswapV2Factory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;
}

interface IUniswapV2Pair {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to)
        external
        returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}

interface IUniswapV2Router01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

interface IAntiSnipe {
  function addPair(address pair) external;
  function setTokenOwner(address owner, address token, address pair) external;

  function onPreTransferCheck(
    address from,
    address to,
    uint256 amount
  ) external returns (bool checked);
}

contract SpaceGoldCoin is Context, IERC20, Ownable {
    using Address for address;
    using SafeERC20 for IERC20;

    mapping(address => bool) public antiSnipeWhitelist;
    mapping(address => uint256) private _tOwned;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) private _isExcludedFromFee;

    string constant private _name = "SpaceGoldCoin";
    string constant private _symbol = "SPACE";
    uint8 constant private _decimals = 9;
    uint256 constant private Total = 1_000_000_000 * (10**_decimals);

    address public LiquifyWallet;
    address public MarketingWallet;
    address public StakingPool;

    uint256 public StakingBuyPoolTax = 3;
    uint256 public LiquidityBuyPoolTax = 5;
    uint256 public MarketingBuyTax = 2;

    uint256 public StakingSellPoolTax = 3;
    uint256 public LiquiditySellPoolTax = 5;
    uint256 public MarketingSellTax = 2;

    uint256 public lockTime;
    bool oneShot = true;
    uint256 private constant maxTxAmt = 500_000 * (10**_decimals);
    bool public pauseBuying = true;

    IAntiSnipe public immutable antisnipe;

    IUniswapV2Router02 public immutable uniswapV2Router;
    address public immutable uniswapV2Pair;
    address public immutable uniswapV2BnbPair;

    //testnet
    // address public BUSD = 0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7;
    // address public router = 0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3;
    //mainnet
    address public constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address public constant router = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address public constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    constructor(
        address _stakingPool,
        address _MarketingWallet,
        address _LiquifyWallet
    ) {
        MarketingWallet = _MarketingWallet;
        StakingPool = _stakingPool;
        LiquifyWallet = _LiquifyWallet;

        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(router);

        // Create a uniswap pair for this new token
        uniswapV2Pair = IUniswapV2Factory(_uniswapV2Router.factory())
            .createPair(address(this), BUSD);

        uniswapV2BnbPair = IUniswapV2Factory(_uniswapV2Router.factory())
            .createPair(address(this), WBNB);

        // set the rest of the contract variables
        uniswapV2Router = _uniswapV2Router;

        _approve(address(this), address(router), type(uint256).max);
        IERC20(BUSD).approve(address(router), type(uint256).max);

        //exclude owner and this contract from fee
        _isExcludedFromFee[address(this)] = true;

        antisnipe = IAntiSnipe(0xc5d1A68ac97f30e5977222Fec331CAe7bE667EC7);
        antisnipe.setTokenOwner(msg.sender, address(this), uniswapV2Pair);
        antisnipe.addPair(uniswapV2BnbPair);

        _tOwned[msg.sender] = Total;
        emit Transfer(address(0), _msgSender(), Total);
    }

    function name() public pure returns (string memory) {
        return _name;
    }

    function symbol() public pure returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return _decimals;
    }

    function totalSupply() public pure override returns (uint256) {
        return Total;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _tOwned[account];
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount)
        public
        override
        returns (bool)
    {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(
            sender,
            _msgSender(),
            _allowances[sender][_msgSender()] - amount
        );
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        virtual
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender] + addedValue
        );
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        virtual
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender] - subtractedValue
        );
        return true;
    }

    function excludeFromFee(address account) public onlyOwner {
        _isExcludedFromFee[account] = true;
    }

    function includeInFee(address account) public onlyOwner {
        _isExcludedFromFee[account] = false;
    }

    function toggleBuying() public onlyOwner {
        pauseBuying = !pauseBuying;
    }

    function toggleTradingWithTimer() public onlyOwner {
        if (oneShot) {
            oneShot = false;
            pauseBuying = false;
            lockTime = block.timestamp + 90 seconds;            
        }
    }

    //to recieve ETH from uniswapV2Router when swaping
    receive() external payable {}

    function isExcludedFromFee(address account) public view returns (bool) {
        return _isExcludedFromFee[account];
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) private {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "Transfer amount must be greater than zero");
        require(_tOwned[sender] >= amount, "ERC20: transfer amount exceeds balance");
        require(!oneShot || sender == owner() || recipient == owner(), "Trading has not started.");

        if(pauseBuying) {
            require(sender != uniswapV2Pair && sender != uniswapV2BnbPair, "Purchases are paused.");
        }

        //if lock is active AND recipient is not whitelisted, recipient can't buy
        if (block.timestamp < lockTime && !antiSnipeWhitelist[recipient]) {
            require(sender != uniswapV2Pair && sender != uniswapV2BnbPair, "Liquidity is locked or limited");
        }
        //if lock is active AND recipient IS whitelisted, recipient can buy up to 1M
        if (block.timestamp < lockTime && antiSnipeWhitelist[recipient]) {
            require(amount <= maxTxAmt, "Can't buy more than allocation");
        }

        if(block.timestamp < lockTime + 90)
            antisnipe.onPreTransferCheck(sender, recipient, amount);

        //if any account belongs to _isExcludedFromFee account then no fee
        if (sender != owner() && recipient != owner() && !_isExcludedFromFee[sender] && !_isExcludedFromFee[recipient]) {
            _tokenTransferStandard(sender, recipient, amount);
        } else {
            _tOwned[sender] -= amount;
            _tOwned[recipient] += amount;

            emit Transfer(sender, recipient, amount);
        }
    }

    //Set fee wallets
    function setLiquidityWallet(address _address) external onlyOwner {
        LiquifyWallet = _address;
    }

    function setStakingAddress(address _pool) external onlyOwner {
        StakingPool = _pool;
    }

    function setMarketingWallet(address _address) external onlyOwner {
        MarketingWallet = _address;
    }

    // Changing the Taxes
    function setStakingBuyPoolTax(uint256 _stakingTax) external onlyOwner {
        StakingBuyPoolTax = _stakingTax;
        require(LiquidityBuyPoolTax + StakingBuyPoolTax + MarketingSellTax <= 30, "Tax too high");
    }

    function setLiquidityBuyPoolTax(uint256 _liquidityPoolTax) external onlyOwner {
        LiquidityBuyPoolTax = _liquidityPoolTax;
        require(LiquidityBuyPoolTax + StakingBuyPoolTax + MarketingSellTax <= 30, "Tax too high");
    }

    function marketingBuyTax(uint256 _marketingTax) external onlyOwner {
        MarketingBuyTax = _marketingTax;
        require(LiquidityBuyPoolTax + StakingBuyPoolTax + MarketingBuyTax <= 30, "Tax too high");
    }

    function setStakingSellPoolTax(uint256 _stakingTax) external onlyOwner {
        StakingSellPoolTax = _stakingTax;
        require(StakingSellPoolTax + LiquiditySellPoolTax + MarketingSellTax <= 30, "Tax too high");
    }

    function setLiquiditySellPoolTax(uint256 _liquidityPoolTax) external onlyOwner {
        LiquiditySellPoolTax = _liquidityPoolTax;
        require(StakingSellPoolTax + LiquiditySellPoolTax + MarketingSellTax <= 30, "Tax too high");
    }

    function marketingSellTax(uint256 _marketingTax) external onlyOwner {
        MarketingSellTax = _marketingTax;
        require(StakingSellPoolTax + LiquiditySellPoolTax + MarketingSellTax <= 30, "Tax too high");
    }

    function _tokenTransferStandard(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        uint256 StakingPoolAmount = 0;
        uint256 marketingAmount = 0;
        uint256 AddToLiquidityAmount = 0;

        if (sender == uniswapV2Pair || sender == uniswapV2BnbPair) {
            StakingPoolAmount = amount * StakingBuyPoolTax / 100;
            marketingAmount = amount * MarketingBuyTax / 100;
            AddToLiquidityAmount = amount * LiquidityBuyPoolTax / 100;
        } else {
            // sell tax & transfer tax the same
            StakingPoolAmount = amount * StakingSellPoolTax / 100;
            marketingAmount = amount * MarketingSellTax / 100;
            AddToLiquidityAmount = amount * LiquiditySellPoolTax / 100;
        }

        _tOwned[sender] -= amount;
    
        _tOwned[StakingPool] += StakingPoolAmount;
        _tOwned[MarketingWallet] += marketingAmount;
        _tOwned[LiquifyWallet] += AddToLiquidityAmount;

        _tOwned[recipient] += amount - (StakingPoolAmount + marketingAmount + AddToLiquidityAmount);

        emit Transfer(sender, StakingPool, StakingPoolAmount);
        emit Transfer(sender, MarketingWallet, marketingAmount);
        emit Transfer(sender, LiquifyWallet, AddToLiquidityAmount);
        emit Transfer(sender, recipient, amount);
    }    

    function addToAntiSniperWhitelist(address _address)
        public
        onlyOwner
        returns (bool)
    {
        antiSnipeWhitelist[_address] = true;
        return true;
    }

    function removeFromAntiSniperWhitelist(address _address)
        external
        onlyOwner
    {
        antiSnipeWhitelist[_address] = false;
    }

    function addMultiToAntiSniperWhitelist(address[] calldata addrs)
        public
        onlyOwner
        returns (bool success)
    {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (addToAntiSniperWhitelist(addrs[i])) {
                success = true;
            }
        }
    }

    function isAddedToAntiSniperWhitelist(address _address)
        external
        view
        returns (bool)
    {
        return antiSnipeWhitelist[_address];
    }

    function recoverTokens(IERC20 token) external onlyOwner {
        token.safeTransfer(msg.sender, token.balanceOf(address(this)));
    }
}