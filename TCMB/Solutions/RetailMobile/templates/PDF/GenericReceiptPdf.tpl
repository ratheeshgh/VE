<pdf baseFont="Helvetica,Cp1252,false" charset=UTF-8>
	<page border="1" bordecolor="EFEFEF" >
		<font size="8">

			<footer>
				<right>
					<!--Banesco Limited-->
					$$DownloadPaymentDetails[1].footer_title$ <br/>
			</footer>
			<center>
				<br />
				<br />
				<font size="8"></font>
					<table width="100%"  bordecolor="CCC"  border="0" bgcolor="ffffff" cellspacing="5" cellpadding="5">
						<tr>
							<td width="500" valign="top" align="left" style="text-align:left">								
								<img align="left" src="$$PROJECTHOME$/html/img/Banesco_logo.png" width="200" height="90"></img>
							</td>

							<td width="400" valign="top" align="right"  >
								<font color="306aa0" size="16" face="Times">
							 
								  
								<table  cellspacing="2" cellpadding="2"  border="0" bordecolor="FFF" >
									<tr><td colspan="2" align="center"  > </td></tr>
									<tr><td colspan="2" align="center"  ><strong><font color="306aa0">RECIBO</strong> </td></tr>
								  
									 <font size="9" face="Helvetica">	
									<tr>
										<td align="right"  >$$DownloadPaymentDetails[1].PaymentDetails[1].itemName$</td>
										<font size="10"  >
										<td bgcolor="EFEFEF" width="200" >$$DownloadPaymentDetails[1].PaymentDetails[1].itemValue$</td>
									</tr>
									<font size="9" >
									<tr><td></td><td   width="200">RIF: J-07013380-5</td> </tr>
								</table>
							</td>

						</tr>

					</table>
					<br />
					<br />



					<font size="12">						 
							<table width="100%" border="0" bordercolor="ffffff" cellspacing="2" cellpadding="2">
								<tr>
									<td  align="center" bgcolor="ffffff"> 										
										$$DownloadPaymentDetails[1].payment_detail_title$									 
									</td>
								</tr>
							</table>
					</font>					


					<table width="100%" border="0" bordercolor="ffffff" cellspacing="2" cellpadding="2">
						<tr>
							<td width="5" bgcolor="ffffff"></td>
							<td width="95" bgcolor="ffffff">
								<font size="9"><strong><!--Date:&nbsp;-->
 										$$DownloadPaymentDetails[1].date_title$: </strong>
								</font>
								<font size="8"> $$DownloadPaymentDetails[1].Date$ </font>
							</td>
						</tr>					 
					</table>				 

					<table width="100%" border="0" bordercolor="f5f5f5" cellspacing="5" cellpadding="4">
						$%for 2 to DownloadPaymentDetails[1].PaymentDetails.lastInstance() $
						<tr>
							<td  width="5" bgcolor="f5f5f5">     </td>
							<td width="50" bgcolor="f5f5f5">
								<font size="9">$$DownloadPaymentDetails[1].PaymentDetails[C].itemName$</font>
							</td>
							<td width="45" bgcolor="f5f5f5">
								<font size="8"><strong>$$DownloadPaymentDetails[1].PaymentDetails[C].itemValue$</strong></font>
							</td>
						</tr>
						$%endfor$
					</table>
					<br />
	</page>
</pdf>