
# BitRick
![](http://www.dotcomma.com.br/wp-content/uploads/2019/10/rick-sanchez.png)

A Telegram Assistent Bot
This is a personal telegram bot. Some plugins are added to the project to provide additional bot services.
#  Getting Started

> Firts: git clone https://github.com/marcosnunesmbs/BitRick.git

> Next: cd BitRick

## Configuration

 1. Create a Telegram Bot and save the Token with @BotFather.
 
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

6. Serach your bot username on Telegram and start it.

7. Join It!

# Plugins
## Structure

 - index.js - main file
 - config.js - the plugin configuration file
 - responses.js - a array of bot responses to errors
 - /services/plugin-name.js - the file that provider connection with api services.

The config.js is necessary to bot map all plugins that have and create the commands helpers.

> The bot will just map the services that been set in main config.js modules key.
### config.js

    {
		"module_name":  "Binance",
		"description":  "Realize consultas na exchange Binance.",
		"functions":  [
			{
			"name":  "consultar saldo",
			"description":  "digite bbalance + moeda para saber o salgo",
			"keypass":  "bbalance"
			},
			{
			"name":  "consultar cotação",
			"description":  "digite btrade + par para saber a cotação",
			"keypass":  "bprice"
			},
			{
			"name":  "consultar ordens",
			"description":  "digite bordens + par para saber as ordens finalizadas e em aberto",
			"keypass":  "borders"
			}
		],
		"APIKEY":  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
		"APISECRET":  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
	}

Them module_name key will be used to bot create the command to show the funcitons commands.
Ex:
![start command mapping services](http://www.dotcomma.com.br/wp-content/uploads/2019/10/start-sample.png)

## Available Plugins
### Binance
This plugin provides some Binance's Servies like: Consult Balances, Verify Criptocurrencys Prices and Your last orders.

*You need to config your APIKEY and APISECRET in __/src/plugins/binance/config.js__*

>Main Command: /binance

### CoinMarketCap
This plugin offers a cryptocurrency conversion based on CoinMarketCap API.

*You need to config your APIKEY in __/src/plugins/cmc/config.js__*

>Main Command: /coinmarketcap



## Doante
If You like this bot, you can donate. Thanks.

NANO: nano_3mjxfnquraoygt4u6uxipeh9pznwbmzx7ncy1dk5ahe6qnf197x917d6ghom

Bitcoin: 3Mt3hGJGWpN2p5AmeAzGvK5Uu9pegSz5J5
