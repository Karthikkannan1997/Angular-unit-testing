import { ComponentFixture,fakeAsync,flush,TestBed, tick, waitForAsync } from "@angular/core/testing";
import { UserComponent } from "./user.component";

describe("unit test for user component",async()=>{
let fixture:ComponentFixture<UserComponent>;
let usercomponent:UserComponent;
   beforeEach(async ()=> {
    await TestBed.configureTestingModule({
        imports:[UserComponent]
   }).compileComponents();


    fixture = TestBed.createComponent(UserComponent);
    usercomponent = fixture.componentInstance;
});

    it("UI should have p,h1,h2,h3",()=>{
        usercomponent.username="";
        fixture.detectChanges();
        const h1tag = fixture.nativeElement.querySelectorAll("h1");
        const h2tag = fixture.nativeElement.querySelectorAll("h2");
        const h3tag = fixture.nativeElement.querySelectorAll("h3")
        expect(h1tag.length).toBe(1);
        expect(h2tag.length).toBe(1);
        expect(h3tag.length).toBe(1);
        expect(fixture.nativeElement.querySelector("p")).withContext("Can't find paragraph").toBeTruthy();
        expect(fixture.nativeElement.querySelector("button")).withContext("Can't find button").toBeTruthy();
        expect(h1tag[0].innerText).toBe("Name - UserName is hidden");
        
    });

    it("username should be shown when button is pressed",fakeAsync(()=>{
       const buttonElement:HTMLButtonElement =  fixture.nativeElement.querySelector("button");
       buttonElement.dispatchEvent(new Event("click"));
       tick(1000);// go ahead 1 sec
       fixture.detectChanges();
       const h1tag = fixture.nativeElement.querySelectorAll("h1");
       expect(h1tag[0].innerText).toBe("Name - Ramesh Verma");
       expect(usercomponent.username).toBe("Ramesh Verma")
    }));

    it("username should be shown when button is pressed",fakeAsync(()=>{
        const buttonElement:HTMLButtonElement =  fixture.nativeElement.querySelector("button");
        buttonElement.dispatchEvent(new Event("click"));
        flush(); // clears all the set time out and intervals
        fixture.detectChanges();
        const h1tag = fixture.nativeElement.querySelectorAll("h1");
        expect(h1tag[0].innerText).toBe("Name - Ramesh Verma");
        expect(usercomponent.username).toBe("Ramesh Verma")
     }));
     it("username should be shown when button is pressed",(done)=>{
        const buttonElement:HTMLButtonElement =  fixture.nativeElement.querySelector("button");
        buttonElement.dispatchEvent(new Event("click"));
        setTimeout(()=>{
            fixture.detectChanges();
            const h1tag = fixture.nativeElement.querySelectorAll("h1");
            expect(h1tag[0].innerText).toBe("Name - Ramesh Verma");
            expect(usercomponent.username).toBe("Ramesh Verma")
            done()//test case will end only after this
        },1000)
        
        
     });

     it("should show username after button click - (waitForAsync)",waitForAsync(()=>{
        const buttonElement:HTMLButtonElement = fixture.nativeElement.querySelector("button")
        buttonElement.click()
        fixture.whenStable().then(()=>{
           expect(usercomponent.username).toBe("Ramesh Verma")
        })
        
  }))
});