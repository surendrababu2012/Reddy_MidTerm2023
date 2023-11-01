const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: 'WELCOMING',
    ITEM_SELECTION: 'ITEM_SELECTION',
    UPS_STAGE: 'UPS_STAGE',
    CALCULATING_TOTAL: 'CALCULATING_TOTAL',
});


const itemPrices = {
    "snow shovels": 15,
    "garbage and recycling containers": 20,
    "light bulbs": 6,
    "household cleaners": 12,
    "furnace filters": 9,
    "screen": 8,
};
const TAX_RATE = 0.14;

module.exports = class HardwareStore extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.items = [];
        this.upsellItems = {
            "Geeky headlamps": 5.00,
            "Ear buds": 5,
        };
        this.totalPrice = 0.00;
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                aReturn.push("Welcome to the Surendra Store! Please click on the below link for price details");
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Type the item names that you want to buy:- snow shovels,garbage and recycling containers,light bulbs, household cleaners, furnace filters, screen?");
                this.stateCur = OrderState.ITEM_SELECTION;
                break;

            case OrderState.ITEM_SELECTION:
                // Check if the input is a valid item
                if (sInput.toLowerCase() == 'snow shovels' || sInput.toLowerCase() == 'garbage and recycling containers' || sInput.toLowerCase() == 'light bulbs' || sInput.toLowerCase() == 'household cleaners'|| sInput.toLowerCase() == 'furnace filters' || sInput.toLowerCase() == 'screen') {
                    this.items.push(sInput.toLowerCase());
                    aReturn.push(`You added ${sInput} to your cart.`);
                    aReturn.push(`Type "yes" to order more, or "no" to proceed for upsell items.`);
                } else if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Select from the items listed : - snow shovels,garbage and recycling containers,light bulbs, household cleaners, furnace filters, screen)")
                    this.stateCur = OrderState.ITEM_SELECTION;
                } else if (sInput.toLowerCase() === 'no') {
                    aReturn.push("Do you want to add an upsell item, Please type 'yes' or 'no'");
                    this.stateCur = OrderState.UPS_STAGE;
                } else {
                    aReturn.push("Invalid Response, Please type correct input");
                }
                break;
            case OrderState.UPS_STAGE:
                if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Select an upsell item: Geeky headlamps ($5), Ear buds ($5)");                   
                    this.stateCur = OrderState.CALCULATING_TOTAL;
                    this.upsellItems = 5;
                }
                else if (sInput.toLowerCase() === "no") {
                    this.totalPrice = calculateTotalPrice(this.items);
                    const amt=this.totalPrice;
                    const tax = this.totalPrice * TAX_RATE;
                    const total = this.totalPrice + tax;
                    aReturn.push(`Total price $${amt.toFixed(2)}`)
                    aReturn.push(`Tax amount $${tax.toFixed(2)}`);
                    aReturn.push(`Your Final bill inclusive tax is $${total.toFixed(2)}.we will text you when we are ready to meet you at curbside.`);
                    break;

                }
                else {
                    aReturn.push("Invalid Input");
                }
                break;

            case OrderState.CALCULATING_TOTAL:
                // Calculate the total price
                if(sInput.toLowerCase() == 'geeky headlamps' || sInput.toLowerCase() == 'ear buds'){
                    this.totalPrice = calculateTotalPrice(this.items) + 5;
                    const amt=this.totalPrice;
                    const tax = this.totalPrice * TAX_RATE;
                    const total = this.totalPrice + tax;
                    aReturn.push(`Total price $${amt.toFixed(2)}`)
                    aReturn.push(`Tax amount $${tax.toFixed(2)}`);
                    aReturn.push(`Your Final bill inclusive tax is $${total.toFixed(2)}.we will text you when we are ready to meet you at curbside.`);
                    this.items = [];
                    this.stateCur = OrderState.WELCOMING;
                    break;    
                }else{
                    aReturn.push(`Wrong Input, Please type "Geeky Headlamps" or "Ear Buds" only`);
                    this.stateCur = OrderState.CALCULATING_TOTAL;
                    break;
                }
        }
        return aReturn;
    }

    renderForm() {
        return (`<html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c12 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 87.8pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c1 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 168pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c7 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 50.2pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c9 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 123pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c0 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c4 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c5 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c10 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c3 {
                    color: #202122;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 12pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c6 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c8 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c2 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 12pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c15 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c17 {
                    background-color: #ffffff;
                    max-width: 451.4pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c11 {
                    height: 39.8pt
                }
        
                .c14 {
                    height: 25.5pt
                }
        
                .c13 {
                    height: 21.8pt
                }
        
                .c16 {
                    height: 34.5pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c17 doc-content">
            <p class="c5"><span class="c10">Welcome to Surendra&rsquo;s Store, please see below list of items for Curbside pick
                    up</span></p>
            <p class="c0"><span class="c10"></span></p>
            <p class="c5"><span class="c10">Please send a message to 411-222-3333 (ex: Hello or Hi)</span></p>
            <p class="c6"><span class="c10"></span></p><a id="t.7b7890360b4c823ecaf8442bd07bc57862ed1968"></a><a id="t.0"></a>
            <table class="c15">
                <tr class="c13">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c8">Items</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c8">Cost</span></p>
                    </td>
                </tr>
                <tr class="c14">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Snow Shovels</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$15</span></p>
                    </td>
                </tr>
                <tr class="c11">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Garbage and recycling containers</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$20</span></p>
                    </td>
                </tr>
                <tr class="c14">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Light-bulbs</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$6</span></p>
                    </td>
                </tr>
                <tr class="c14">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Household cleaners</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$12</span></p>
                    </td>
                </tr>
                <tr class="c14">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Furnace filters</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$9</span></p>
                    </td>
                </tr>
                <tr class="c14">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Screen for screen door</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$8</span></p>
                    </td>
                </tr>
            </table>
            <p class="c6"><span class="c10"><br></span></p>
            <p class="c6"><span class="c10"></span></p><a id="t.50231d7c763529a835af4714f630ebb65a7ffa09"></a><a id="t.1"></a>
            <table class="c15">
                <tr class="c13">
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c4"><span class="c8">Upsell Item</span></p>
                    </td>
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c4"><span class="c8">Cost</span></p>
                    </td>
                </tr>
                <tr class="c14">
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Geeky headlamps</span></p>
                    </td>
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$5</span></p>
                    </td>
                </tr>
                <tr class="c16">
                    <td class="c9" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Ear buds</span></p>
                    </td>
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c4"><span class="c2">$5</span></p>
                        <p class="c6"><span class="c2"></span></p>
                    </td>
                </tr>
            </table>
            <p class="c6"><span class="c10"><br><br><br></span></p>
        </body>
        
        </html>`

        )
    }

}

// Function to calculate the total price
function calculateTotalPrice(items) {
    console.log(items);
    let totalPrice = 0;
    for (let i=0;i<items.length;i++) {
        // Check if the item is in the itemPrices object and add its price
        if (itemPrices[items[i]]) {
            totalPrice += itemPrices[items[i]];
        }
    }
    return totalPrice;
}




