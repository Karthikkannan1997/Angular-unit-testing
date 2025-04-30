import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { Commnet } from '../models/Comment';
import { API_URL } from '../utils/resources';

describe("Unit Test cases for Comments Service",()=>{

let commentService:CommentsService;
let httpMock:HttpTestingController;

beforeEach(()=>{
TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[CommentsService]
})
httpMock = TestBed.inject(HttpTestingController);
commentService = TestBed.inject(CommentsService)

});

afterEach(()=>{
    httpMock.verify();
});

it("Test for getAllComments",()=>{
  let responseData:any=[{id:1,text:"loadTest1"},{id:2,text:"loadTest2"}];
  let actualData:any;
  commentService.getAllComments().subscribe((data)=>{
  
    actualData=data;
   
});

  const req = httpMock.expectOne(`${API_URL}/comments`);
  expect(req.request.method).toBe("GET");
  req.flush(responseData); // Simulate backend response

  // Now the subscription executes and actualUsers gets assigned
  expect(actualData.length).toBe(2);
  expect(actualData).toEqual(responseData);
  
});

it("Test for getcomments by id",()=>{
    let responseData:any=[{id:1,text:"commentbyId"}];
    let actualData:any;
    commentService.getCommentById(1).subscribe((data)=>{
    
      actualData=data;
     expect(actualData.length).toBe(1);
    expect(actualData).toEqual(responseData);
     
  });
  const req = httpMock.expectOne(`${API_URL}/comments/1`);
  expect(req.request.method).toBe("GET");
  req.flush(responseData); // Simulate backend response
});

it("Test for post method",()=>{

    spyOn(Date,"now").and.returnValue(1)
    let responseData:any=[{id:Date.now(),text:"postData1"}];
    let actualData:any;
    commentService.postComment(responseData).subscribe((data)=>{
  
    actualData=data;
    expect(actualData.length).toBe(1);
    expect(actualData).toEqual(responseData);
   
});
const req = httpMock.expectOne(`${API_URL}/comments`,responseData);
  expect(req.request.method).toBe("POST");
  req.flush(responseData); // Simulate backend response

});

});