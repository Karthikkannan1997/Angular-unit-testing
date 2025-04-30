
import { CommentsService } from "../../services/comments.service";
import { CommentComponent } from "./comment.component";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { of } from "rxjs";


describe("unit test for comments component",()=>{

let commentComponent:CommentComponent    
let fixture:ComponentFixture<CommentComponent>
let commentService: jasmine.SpyObj<CommentsService>
beforeEach(async ()=>{
    const commSpy = jasmine.createSpyObj("CommentsService",["getAllComments","postComment"])
   await TestBed.configureTestingModule({
        imports:[CommentComponent],
        providers:[{provide:CommentsService,useValue:commSpy}]
    }).compileComponents()
  commentService = TestBed.inject(CommentsService) as  jasmine.SpyObj<CommentsService>
  fixture = TestBed.createComponent(CommentComponent);
  commentComponent = fixture.componentInstance;
})

it("h1,input,button tag should be present with text",()=>{
const h1tag = fixture.nativeElement.querySelectorAll("h1");
expect(h1tag.length).toBe(1);
expect(h1tag[0].innerText).withContext("Text mismatch").toBe("welcome to comments section")
expect(fixture.nativeElement.querySelector("input")).withContext("Can't find input").toBeTruthy()
expect(fixture.nativeElement.querySelector("button")).withContext("Can't find button").toBeTruthy()
}),

it("should load comments on initialization",()=>{
    let data=[{id:1,text:"loaded"}]
    commentService.getAllComments.and.returnValue(of(data));
    fixture.detectChanges();
    const li = fixture.nativeElement.querySelectorAll("li");
    expect(li.length).toBe(1);
    expect(li[0].innerText).toBe(data[0].text)
    expect(commentComponent.allComments[0].text).toEqual(data[0].text)
});

it("If text is empty alert should be called",()=>{
    spyOn(window,"alert");
    commentComponent.text = "";
    commentComponent.handleSubmit();  
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledOnceWith("Please add a comment")
    expect(commentService.postComment).not.toHaveBeenCalled()
}),

it("when typed in input it should update text variable",()=>{
  let inputElement:HTMLInputElement=fixture.nativeElement.querySelector("input");
  inputElement.value="Karthik"
  inputElement.dispatchEvent(new Event("input"))
  expect(commentComponent.text).toEqual(inputElement.value);

}),

it("should add comments in ui, when user post",()=>{
    commentService.getAllComments.and.returnValue(of([]));
    fixture.detectChanges();
    let comment = {id:1,text:"added"}
    commentService.postComment.and.returnValue(of(comment));
    spyOn(Date,"now").and.returnValue(1)
    let inputElement:HTMLInputElement=fixture.nativeElement.querySelector("input");
    inputElement.value=comment.text
    inputElement.dispatchEvent(new Event("input"));
    let buttonElement:HTMLButtonElement=fixture.nativeElement.querySelector("button");
    buttonElement.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(commentComponent.allComments[0].text).toEqual(comment.text)
    expect(commentComponent.text).toBeFalsy();
    const commentsLiElements = fixture.nativeElement.querySelectorAll("li")
    expect(commentsLiElements.length).toBe(1)
    expect(commentsLiElements[0].innerText).toBe(comment.text)
    expect(commentService.postComment).toHaveBeenCalledWith(comment);
})
});