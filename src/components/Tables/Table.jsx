import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 20px;
  max-height: 500px; /* Define una altura máxima para el contenedor */
  overflow: auto; /* Habilita el desplazamiento */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
  position: sticky;
  top: -1px;
  background: white; /* Asegura que el fondo de la cabecera sea sólido */
  z-index: 1; /* Asegura que la cabecera esté por encima del contenido */
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const Table = ({ data, columns }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <TableHeader key={index}>{col.header}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
