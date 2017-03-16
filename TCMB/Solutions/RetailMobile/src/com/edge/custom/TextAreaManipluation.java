package com.edge.custom;
import java.io.*;
import java.util.*;

public class TextAreaManipluation
{


 public static int textAreaCount(String args) 
{
	try
	{	
	String[] argsList = args.split("\n");
	int len=argsList.length;	
	return(len);	
	}
	catch(Exception e)
	{
	return(0);
	}
}
public static String textAreaDatatoT24(String args, String ctr) 
{
	try
	{
	int i=Integer.parseInt(ctr);
   String[] argsList = args.split("\n");
   String strget=argsList[i-1];
	    if(strget!=null)
	    			return(strget);	    	
	    else
	 		return("");	 
	}
	catch(Exception e)
	{
		return("");
	}
}

public static String textAreaDataFromT24(String args) 
{
	try
{
if((args!=null) || !args.equals(""))
{
String finalStr=args.replaceAll("~","\n");	
return(finalStr);
}
else
{
return("");	
}	
}
catch(Exception e)
{
	return("");
}
}
	public static void main(String arg[])
	{
		int testString1 = TextAreaManipluation.textAreaCount((String)arg[0]);	
		String StrCtr=arg[1];
		String StrString=arg[0];
		String testString = TextAreaManipluation.textAreaDatatoT24(StrString,StrCtr);	
		String testStringfrom = TextAreaManipluation.textAreaDataFromT24((String)arg[0]);	
	}
}