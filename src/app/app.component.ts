import { Component } from '@angular/core';
import { WordsService } from './service/words.service';
import { WordType } from './model/wordtype';
import { Words } from './model/words';
import { Sentence } from './model/sentence';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SentenceBuilder';

  constructor(private wordsService: WordsService) {}

  listWordTypes!: WordType[];
  listWords!: Words[];

  myWords: string[] = [];
  concatWords: string = '';

  listSentences: Sentence[] = [];

  ngOnInit() {
    this.wordsService.getWordTypes().subscribe((data) => {
      this.listWordTypes = data;
      this.loadSentences();
      //console.log("Word Types Loaded", this.listWordTypes)
    });
  }

  public onWordsSelected(selectedWordTypeId: any) {
    this.wordsService.getWords(selectedWordTypeId.value.Types).subscribe((data) => {
      this.listWords = data;
      console.log('Word Type selected', selectedWordTypeId.value.Types);
      this.listWords = this.listWords.filter((word) => word.wordTypesId == selectedWordTypeId.value.id);
      console.log('Words Loaded', this.listWords);
    });
  }

  public onTypeSelected(selectedWordTypeId: any) {
    this.myWords.push(selectedWordTypeId.value.Word);
    this.concatWords = this.myWords.join(' ');
    console.log('Words Selected', this.concatWords);

    const myParagraph = document.getElementById('myParagraph');

    if (myParagraph !== null) {
      myParagraph.textContent = this.concatWords;
    } else {
      console.log('The element does not exist!');
    }
  }

  public onSubmit() {
    console.log('Sentence Build', this.concatWords);

    this.wordsService
      .postSentences(this.concatWords)
      .pipe(
        tap((response) => {
          console.log('Word saved successfully:', response);
          // Perform any additional actions after saving the word
        }),
        catchError((error) => {
          console.error('Error saving word:', error);
          // Handle the error
          return []; // Provide a default value or handle the error appropriately
        })
      )
      .subscribe();

    console.log('Saved');
  }
  loadSentences() {
    this.wordsService.getSentences().subscribe(
      (data) => {
        this.listSentences = data;
        console.log('Sentences Loaded', this.listSentences);
      },
      (error) => {
        console.error('Error loading sentences:', error);
      }
    );
  }
}
