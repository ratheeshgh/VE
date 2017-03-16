package com.edge.integration;


import java.io.IOException;
import java.math.BigDecimal;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.acquire.intelligentforms.ILogInfo;
import com.acquire.intelligentforms.presentation.BaseServletController;




	public class CalculateDistanceFromCurrentLocation extends BaseServletController{
		  /**
		 * 
		 */
		
		private static final long serialVersionUID = 1L;
		public final static double AVERAGE_RADIUS_OF_EARTH = 6371;
	/*	public static double hello(){
			
			System.out.println("Hai");
			return 55.1234567;
		}*/
		

public static double DistanceFromCurrentCoordinates(BigDecimal userLat,BigDecimal userLng,BigDecimal venueLat,BigDecimal venueLng){
		
		double x;
		
		double userLat1=userLat.doubleValue();
		double userLng1=userLng.doubleValue();
		double venueLat1=venueLat.doubleValue();
		double venueLng1=venueLng.doubleValue();
		 double latDistance = Math.toRadians(userLat1 - venueLat1);
         double lngDistance = Math.toRadians(userLng1 - venueLng1);

         double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)+ Math.cos(Math.toRadians(userLat1)) * Math.cos(Math.toRadians(venueLat1))* Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    x = (AVERAGE_RADIUS_OF_EARTH * c);
  
    return x;
   
			
	}
	@Override
	public ILogInfo getLogInfo(Object arg0) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getRunTimePrefix() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean handlesPageNumbers() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	protected void doGetImpl(HttpServletRequest arg0, HttpServletResponse arg1) throws IOException, ServletException {
		// TODO Auto-generated method stub
		
	}
	@Override
	protected void doPostImpl(HttpServletRequest arg0, HttpServletResponse arg1) throws IOException, ServletException {
		// TODO Auto-generated method stub
		
	}
	
 /*public static void main(String args[])
   {
	     
	 //    System.out.println(p);
	     hello();
   }*/
   
   
	}