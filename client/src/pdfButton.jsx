import React, { useState } from 'react'
import jsPDF from 'jspdf';


const PdfButton = () => {
    
    const pdfHandler = async () => {
        try {
            const apiEndpoint = 'http://localhost:5000/allrecords';
            const apiResponse = await fetch(apiEndpoint, {
                method: 'GET',
                credentials: 'include'
            });

            if (apiResponse.ok) {
                const data = await apiResponse.json();
                console.log('Records:', data.records);

                // Generate PDF with each record on a separate page
                generatePdf(data.records);
            } else {
                console.error('Error fetching records:', apiResponse.status, apiResponse.statusText);
            }
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };

    const generatePdf = (records) => {
        const pdf = new jsPDF();

        // Iterate over records and add each to a new page
        records.forEach((record, index) => {
            if (index > 0) {
                pdf.addPage(); // Add a new page for each record (except the first one)
            }

            let yPos = 10;
            const lineHeight = 10;

            // Organize the data in a formatted way
            pdf.text(`Record ${index + 1}`, 10, yPos);
            yPos += lineHeight;

            Object.entries(record).forEach(([key, value]) => {
                pdf.text(`${key}: ${value}`, 10, yPos);
                yPos += lineHeight;
            });
        });

        // Save the PDF as a file
        pdf.save('records.pdf');
    };
    return (
        <>
            <button onClick={pdfHandler}>
                PDF
            </button>

        </>
    )
}

export default PdfButton