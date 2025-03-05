import ReactExport from 'react-export-excel-xlsx-fix';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;






export default function DownloadExcelAnexo({multiDataSetAnexo}) {






      const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos=0) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos))

    }





	return(<>
		      <ExcelFile>
                <ExcelSheet dataSet={multiDataSetAnexo} name="Organization" />
            </ExcelFile>
		</>)
}


