console.log('App is running')
let template = (
    <div>
        <h1>This is from app.js</h1>
        <p>This is a paragraph</p>
    </div>
);

const workbook = {
    url:'https://public.tableau.com/views/IndexDemo/IndexDemo?:language=en-US&:display_count=n&:origin=viz_share_link',
    options:{
        hideTabs:true,
        onFirstInteractive:()=>
        {
            console.log('Run this code when the viz has finished loading');
            document.getElementById('getData').disabled = false; 
        }
    }
}
const vizContainer = document.getElementById('vizContainer')
const viz = new tableau.Viz(vizContainer,workbook.url,workbook.options)
const getUnderlyingData = ()=>{
    const sheet = viz.getWorkbook().getActiveSheet().getWorksheets()[0];
    const options = {
        maxRows: 10,
        ignoreAliases: false,
        ignoreSelection: true,
        includeAllColumns: false
    }
    console.log(sheet)
    sheet.getUnderlyingDataAsync(options).then(
        (t)=>{
            table = t;
            debugger;
            console.log(t)
            const target = document.getElementById('dataTarget');
            target.innerHTML = '<p>' + JSON.stringify(table.getData()) +'</p>';
        }
    )
}
const appRoot = document.getElementById('app')
ReactDOM.render(template, appRoot)