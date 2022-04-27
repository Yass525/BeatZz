import React from 'react'

export const Table = ({data}) => {
  return (
  <table>
      <tbody>

          <h1>
              <div style={{color: "purple"}}  
                  />Lyrics🎙🎶💖      
            
          </h1>

          <tr>
              <td style={{color: "wheat", textAlign:"center",width:100}}>{data}</td>
              </tr>
          

      </tbody>
  </table>
  )
   }
export default Table;
