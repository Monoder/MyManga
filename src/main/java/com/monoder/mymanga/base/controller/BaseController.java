package com.monoder.mymanga.base.controller;

import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.service.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class BaseController{
    protected final Logger logger = LoggerFactory.getLogger( this.getClass() );

    @ExceptionHandler( ServiceException.class )
    public ResponseEntity handleException( Throwable throwable ){
        JsonResult< Void > jsonResult = new JsonResult<>( throwable );
        if( throwable instanceof FileHandleException ){
            jsonResult.setStatus( 400 );
        } else if( throwable instanceof InsertException ){
            jsonResult.setStatus( 500 );
        } else if( throwable instanceof DeleteException ){
            jsonResult.setStatus( 500 );
        } else if( throwable instanceof SelectException ){
            jsonResult.setStatus( 500 );
        }
        return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).body( jsonResult );
    }

}
