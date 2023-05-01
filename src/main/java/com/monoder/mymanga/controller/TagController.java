package com.monoder.mymanga.controller;

import com.monoder.mymanga.entity.dto.JsonResult;
import com.monoder.mymanga.entity.dto.TagDTO;
import com.monoder.mymanga.service.ITagDetailService;
import com.monoder.mymanga.service.exception.InsertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Monoder
 */
@RestController
@RequestMapping( "Tag" )
public class TagController{

    @Autowired
    private ITagDetailService iTagDetailService;

    @RequestMapping ( "addTag" )
    public ResponseEntity addTagDetail ( @RequestBody TagDTO tagDTO ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType( MediaType.APPLICATION_JSON );
        try{
            return new ResponseEntity<>( iTagDetailService.addTag( tagDTO ), headers, HttpStatus.OK );
        } catch( InsertException e ){
            return new ResponseEntity<>( e.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @RequestMapping ( "deleteTag" )
    public ResponseEntity deleteTag (  @RequestBody String[] tagGuids ) {
        HttpHeaders headers = new HttpHeaders ( );
        headers.setContentType ( MediaType.APPLICATION_JSON );
        return new ResponseEntity <> ( new JsonResult (  200, iTagDetailService.logicalDeleteByGuids ( tagGuids ) ), headers, HttpStatus.OK );
    }

    @RequestMapping ( "updateTag" )
    public ResponseEntity updateTagDetail ( @RequestBody TagDTO tagDTO ) {
        HttpHeaders headers = new HttpHeaders ( );
        headers.setContentType ( MediaType.APPLICATION_JSON );
        return new ResponseEntity <> ( iTagDetailService.updateTagDetail ( tagDTO ), headers, HttpStatus.OK );
    }

    @RequestMapping( "listTag" )
    public ResponseEntity listTagDetail( @RequestBody JsonResult< Object > requestJsonRequest ){
        HttpHeaders headers = new HttpHeaders ( );
        headers.setContentType ( MediaType.APPLICATION_JSON );
        return new ResponseEntity <> ( iTagDetailService.listTagDetail ( requestJsonRequest ), headers, HttpStatus.OK );
    }

}
