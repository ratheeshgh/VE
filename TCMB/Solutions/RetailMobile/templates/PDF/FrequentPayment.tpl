<pdf baseFont="Helvetica,Cp1252,false" charset=UTF-8>

<page>
<font size="8">

<footer>
		<right>
		Banesco Limited<br />
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
		<td width="500" valign="top" align="right"  style="text-align:right">
			<right>
			<p>T +011-507-282-2013<br />
			E  ACLIENTE_PA@BANESCO.COM</p>
		</td>
		
	</tr>
</table>
<br />
<br />


<font size="10">
$%if FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions.lastInstance() != -1$ 
<table width="100%" border="0" bordercolor="dddddd" cellspacing="2" cellpadding="2">
<tr><td bgcolor="ffffff"><strong>My Account Transaction</strong></td></tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="3">
<tr>
    <td bgcolor="dddddd" width="10%"><strong><font color="000000" size="9"><b>Reference No.</font></strong></td></b>
    <td bgcolor="dddddd" width="36%"><strong><font color="000000" size="9"><b>Transaction To</font></strong></td></b>
    <td bgcolor="dddddd" width="14%"><strong><font color="000000" size="9"><b>Amount</font></strong></td></b>
	<td bgcolor="dddddd" width="8%"><strong><font color="000000" size="9"><b>Description</font></strong></td></b>
    <td bgcolor="dddddd" width="10%"><strong><font color="000000" size="9"><b>Status</font></strong></td></b>
  </tr>
$%for 1 to FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions.lastInstance() $ 
  <tr>    
       <td bgcolor="ffffff" width="10%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions[C].transaction_receipt$</font></td>
       <td bgcolor="ffffff" width="36%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions[C].transaction_to$</font></td>
       <td bgcolor="ffffff" width="14%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions[C].transaction_amount$</font></td>
       <td bgcolor="ffffff" width="8%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions[C].transaction_description$</font></td>
       <td bgcolor="ffffff" width="10%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].MyAccountTransactions[C].transaction_status$</font></td>     
  </tr>
$%endfor$
</table>
$%endif$
<br />
<br />

<font size="10">
$%if FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew.lastInstance() != -1$ 
<table width="100%" border="0" bordercolor="dddddd" cellspacing="2" cellpadding="2">
<tr><td bgcolor="ffffff"><strong>Credit Transaction</strong></td></tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="3">
<tr>
    <td bgcolor="dddddd" width="10%"><strong><font color="000000" size="9"><b>Reference No.</font></strong></td></b>
    <td bgcolor="dddddd" width="36%"><strong><font color="000000" size="9"><b>Transaction To</font></strong></td></b>
    <td bgcolor="dddddd" width="14%"><strong><font color="000000" size="9"><b>Amount</font></strong></td></b>
	<td bgcolor="dddddd" width="8%"><strong><font color="000000" size="9"><b>Description</font></strong></td></b>
    <td bgcolor="dddddd" width="10%"><strong><font color="000000" size="9"><b>Status</font></strong></td></b>
  </tr>
$%for 1 to FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew[C].lastInstance() $ 
  <tr>    
       <td bgcolor="ffffff" width="10%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew[C].transaction_receipt$</font></td>
       <td bgcolor="ffffff" width="36%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew[C].transaction_to$</font></td>
       <td bgcolor="ffffff" width="14%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew[C].transaction_amount$</font></td>
       <td bgcolor="ffffff" width="8%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew[C].transaction_description$</font></td>
       <td bgcolor="ffffff" width="10%"><font size="7">$$FrequentPayments[1].FrequentPaymentConfirm[1].CreditTransactionsNew[C].transaction_status$</font></td>     
  </tr>
$%endfor$
</table>
$%endif$


</pdf>