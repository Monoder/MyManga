package com.monoder.mymanga.service.exception;

public class FileHandleException extends ServiceException{

    public FileHandleException(){
        super();
    }

    public FileHandleException( String message ){
        super( message );
    }

    public FileHandleException( String message, Throwable cause ){
        super( message, cause );
    }

    public FileHandleException( Throwable cause ){
        super( cause );
    }

    protected FileHandleException( String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace ){
        super( message, cause, enableSuppression, writableStackTrace );
    }
}
