
# BitRick
A Telegram Assistent Bot
This is a personal telegram bot. Some plugins are added to the project to provide additional bot services.
#  Getting Started
 1. Create a Telegram Bot and save the Token com @BotFather.
	1.1. Open your Telegram and search for:  **@BotFather**;
	1.2. Type it:  **/newbot**;
	1.3.  Set a  **name** to your bot;
	1.4.  Set a  **username**
	1.5.  You will receive a  **Token**. Save it.
 2. Copy the sample.config.json file to **config.json** in the **/src/config** folder.
 3. Set your **botToken** and **TelegramID** (your user id in telegram).
	 3.1 To get your User Id, you need to search fot **@userdatabot**, type **/start** and receive your id.
4. To active plugins services you need to set a array of services names on **modules key on /src/config/config.js** file.
5. You can find the avaliable services in **/src/plugins** folders.

# Plugins
## Structure

## Available Plugins
### Binance
This plugin provides some Binance's Servies like: Consult Balances, Verify Criptocurrencys Prices and Your last orders.

*You need to config your APIKEY and APISECRET in __/src/plugins/binance/config.js__*

>Main Command: /binance

### CoinMarketCap
This plugin offers a cryptocurrency conversion based on CoinMarketCap API.

*You need to config your APIKEY in __/src/plugins/cmc/config.js__*

>Main Command: /coinmarketcap
