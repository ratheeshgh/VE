<pdf baseFont="Helvetica,Cp1252,false" charset=UTF-8>
	<page>
		<font size="8">

			<footer>
				<right>
					<!--Banesco Limited-->
					$$DownloadPaymentDetails[1].footer_title$ <br/>
			</footer>
			<center>
				<br />
				<br />
				<font size="8">
					<table width="100%" border="0" bgcolor="ffffff" cellspacing="5" cellpadding="5">
						<tr>
							<td width="70" valign="top" align="right" style="text-align:right">
								<right>
									<img src="$$PROJECTHOME$/html/img/Banesco_logo.png" width="100" height="35"></img>
							</td>
							<td width="500" valign="top" align="right" style="text-align:right">
								<right>
									<p>T +011-507-282-2013<br /> E ACLIENTE_PA@BANESCO.COM</p>
							</td>

						</tr>
					</table>
					<br />
					<br />

					<table width="100%" border="0" bordercolor="ffffff" cellspacing="2" cellpadding="2">
						<tr>
							<td bgcolor="ffffff">
								<font size="8"><strong><!--Date:&nbsp;-->
 										$$DownloadPaymentDetails[1].date_title$: </strong>
								</font>
								<font size="7">$$DownloadPaymentDetails[1].Date$ </font>
							</td>
						</tr>
						<tr>
							<td bgcolor="ffffff">
								<font size="8">
									<strong>
										<!--Time:&nbsp;-->
										$$DownloadPaymentDetails[1].time_title$:
									</strong>
								</font>
								<font size="7">$$DownloadPaymentDetails[1].Time$ </font>
							</td>
						</tr>
					</table>
					<br />

					<font size="9">
						<table width="100%" border="0" bordercolor="ffffff" cellspacing="2" cellpadding="2">
							<tr>
								<td bgcolor="ffffff"><strong>
									<!--PAYMENT DETAILS-->
									$$DownloadPaymentDetails[1].payment_detail_title$
									</strong>
								</td>
							</tr>
						</table>
					</font>

					<table width="100%" border="0" bordercolor="ffffff" cellspacing="2" cellpadding="2">
						$%for 1 to DownloadPaymentDetails[1].PaymentDetails.lastInstance() $
						<tr>
							<td bgcolor="ffffff">
								<font size="8">$$DownloadPaymentDetails[1].PaymentDetails[C].itemName$</font>
							</td>
							<td bgcolor="ffffff">
								<font size="7">$$DownloadPaymentDetails[1].PaymentDetails[C].itemValue$</font>
							</td>
						</tr>
						$%endfor$
					</table>
					<br />
	</page>
</pdf>