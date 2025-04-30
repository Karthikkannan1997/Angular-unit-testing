
import { TestBed } from "@angular/core/testing";
import { FormatMobPipe } from "./format-mob.pipe";

describe("unit test for user component",async()=>{
    let pipe:FormatMobPipe 
   beforeEach(async ()=> {
    await TestBed.configureTestingModule({
        imports:[FormatMobPipe],
        providers:[FormatMobPipe]
   }).compileComponents();
   pipe = TestBed.inject(FormatMobPipe);
    
    
});

it("Format pipe should return +91- as prefix by default",()=>{

    expect(pipe.transform(9884893395)).toBe("+91-9884893395");
});



it("Format pipe should return +1- as prefix for USA",()=>{

    expect(pipe.transform(9884893395,"USA")).toBe("+1-9884893395");
});
});


