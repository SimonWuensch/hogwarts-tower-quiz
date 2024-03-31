import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Question {
  question: string;
  answers: {
    school: 'ravenclaw' | 'huffelpuff' | 'gryffindor' | 'slytherin';
    answer: string;
  }[];
}

interface ResultPercentages {
  ravenclaw: number;
  huffelpuff: number;
  gryffindor: number;
  slytherin: number;
}

@Component({
  selector: 'app-hogwarts-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hogwarts-test.component.html',
  styleUrl: './hogwarts-test.component.css',
})
export class HogwartsTestComponent {
  questions: Question[] = QUESTSIONS;
  quizForm: FormGroup;
  result: ResultPercentages | null = null;
  currentStep: number = 0;

  constructor(private fb: FormBuilder) {
    this.questions = this.shuffleArray(this.questions);
    this.questions.forEach(
      (item) => (item.answers = this.shuffleArray(item.answers))
    );

    this.quizForm = this.fb.group({
      answers: this.fb.array(
        this.questions.map(() => this.fb.control('', Validators.required))
      ),
    });
  }

  nextQuestion(): void {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    } else {
      this.submitQuiz();
    }
  }

  previousQuestion(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitQuiz() {
    const answers = this.quizForm.value.answers;
    const tally: Record<string, number> = {
      ravenclaw: 0,
      huffelpuff: 0,
      gryffindor: 0,
      slytherin: 0,
    };

    answers.forEach(
      (answer: 'ravenclaw' | 'huffelpuff' | 'gryffindor' | 'slytherin') => {
        tally[answer]++;
      }
    );

    // Berechnen der Gesamtzahl der Antworten
    const totalAnswers = answers.length;

    // Umwandlung der Tally-Werte in Prozent
    const percentages: ResultPercentages = {
      ravenclaw: (tally['ravenclaw'] / totalAnswers) * 100,
      huffelpuff: (tally['huffelpuff'] / totalAnswers) * 100,
      gryffindor: (tally['gryffindor'] / totalAnswers) * 100,
      slytherin: (tally['slytherin'] / totalAnswers) * 100,
    };

    // Für eine detailliertere Auswertung könnte man das Ergebnis als Array oder Objekt von Prozenten speichern
    this.result = percentages;
  }

  getFormControlName(index: number): string {
    return index.toString();
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generiere einen zufälligen Index kleiner als der aktuelle Index
      const j = Math.floor(Math.random() * (i + 1));
      // Tausche das aktuelle Element mit dem zufälligen Element
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

const QUESTSIONS = [
  {
    question: 'Was ist dir am wichtigsten?',
    answers: [
      { school: 'ravenclaw', answer: 'Wissen und Intelligenz' },
      { school: 'huffelpuff', answer: 'Loyalität und Gerechtigkeit' },
      { school: 'gryffindor', answer: 'Mut und Abenteuer' },
      { school: 'slytherin', answer: 'Ehrgeiz und Cleverness' },
    ],
  },
  {
    question:
      'Du hast die Chance, einen magischen Gegenstand zu wählen. Welcher wäre es?',
    answers: [
      { school: 'ravenclaw', answer: 'Eine Karte, die alles zeigt' },
      { school: 'huffelpuff', answer: 'Ein Medaillon, das Glück bringt' },
      { school: 'gryffindor', answer: 'Ein Schwert, das dir kraft gibt' },
      {
        school: 'slytherin',
        answer: 'Ein Buch, das unendliches Wissen verspricht',
      },
    ],
  },
  {
    question: 'Wie würden deine Freunde dich beschreiben?',
    answers: [
      { school: 'ravenclaw', answer: 'Als den Denker der Gruppe' },
      { school: 'huffelpuff', answer: 'Als den Verlässlichsten' },
      { school: 'gryffindor', answer: 'Als den Mutigsten' },
      { school: 'slytherin', answer: 'Als den Listigsten' },
    ],
  },
  {
    question: 'Was ist deine größte Angst?',
    answers: [
      { school: 'ravenclaw', answer: 'Ignoranz' },
      { school: 'huffelpuff', answer: 'Ausgeschlossen sein' },
      { school: 'gryffindor', answer: 'Ohnmacht' },
      { school: 'slytherin', answer: 'Versagen' },
    ],
  },
  {
    question: 'In welcher Umgebung fühlst du dich am wohlsten?',
    answers: [
      { school: 'ravenclaw', answer: 'Eine ruhige Bibliothek' },
      { school: 'huffelpuff', answer: 'Ein gemütliches Zuhause' },
      {
        school: 'gryffindor',
        answer: 'Auf der Reiße zu neuen Orten',
      },
      {
        school: 'slytherin',
        answer: 'Ein Ort, an dem ich strategisch denken und planen kann',
      },
    ],
  },
  {
    question: 'Welches Motto spricht dich am meisten an?',
    answers: [
      { school: 'ravenclaw', answer: '"Wissen ist Macht."' },
      {
        school: 'huffelpuff',
        answer: '"Tue, was richtig ist, nicht was einfach ist."',
      },
      { school: 'gryffindor', answer: '"Furchtlosigkeit führt zum Erfolg."' },
      { school: 'slytherin', answer: '"Der Zweck heiligt die Mittel."' },
    ],
  },
  {
    question: 'Was ist deine Stärke in einem Team?',
    answers: [
      { school: 'ravenclaw', answer: 'Problemlöser' },
      { school: 'huffelpuff', answer: 'Der, der alle zusammenhält' },
      { school: 'gryffindor', answer: 'Der Anführer' },
      { school: 'slytherin', answer: 'Der Stratege' },
    ],
  },
  {
    question:
      'Ein unbekanntes Tier kreuzt deinen Weg im Verbotenen Wald. Wie verhältst du dich?',
    answers: [
      {
        school: 'gryffindor',
        answer:
          'Ich nähere mich vorsichtig, um zu sehen, ob ich helfen kann oder es erforschen kann.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich beobachte aus der Ferne und suche dann Hilfe bei jemandem, der sich mit magischen Kreaturen auskennt.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich ziehe leise mein Buch über magische Wesen zu Rate, um es sicher identifizieren zu können.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich nutze die Gelegenheit, um zu lernen, wie man das Wesen zu meinem Vorteil nutzen könnte.',
      },
    ],
  },
  {
    question:
      'Du findest einen geheimnisvollen Gegenstand im Gemeinschaftsraum. Was unternimmst du?',
    answers: [
      {
        school: 'gryffindor',
        answer:
          'Ich untersuche den Gegenstand sofort, um sein Geheimnis zu enthüllen.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich frage in der Gruppe herum, um herauszufinden, wem er gehört und ob jemand etwas darüber weiß.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich recherchiere in der Bibliothek, um mehr über seine Herkunft und Funktion zu erfahren.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich überlege, wie der Gegenstand mir oder meinen Plänen nützen könnte, bevor ich ihn eventuell zurückgebe.',
      },
    ],
  },
  {
    question:
      'Dein bester Freund teilt dir ein großes Geheimnis mit. Wie reagierst du?',
    answers: [
      {
        school: 'gryffindor',
        answer: 'Ich versichere ihm meine Unterstützung, egal was kommt.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich biete mein offenes Ohr und unerschütterliche Loyalität an, um durch diese Zeit zu helfen.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich biete Ratschläge basierend auf Wissen und Weisheit, um ihm bei der Lösung zu helfen.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich überlege, wie dieses Geheimnis die Dynamik unserer Gruppe beeinflussen könnte und plane dementsprechend.',
      },
    ],
  },
  {
    question:
      'Während eines Ausflugs nach Hogsmeade bemerkst du, dass jemand dir folgt. Wie gehst du vor?',
    answers: [
      {
        school: 'gryffindor',
        answer:
          'Ich drehe mich um und konfrontiere die Person direkt, um ihre Absichten zu erfahren.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich suche die Nähe zu meinen Freunden oder zu Orten, wo viele Menschen sind.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich ändere meine Route geschickt, um zu testen, ob ich wirklich verfolgt werde und um mehr Informationen zu sammeln.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich lege eine Falle, um den Verfolger zu überraschen und herauszufinden, was er will.',
      },
    ],
  },
  {
    question:
      'Ein Gerücht über einen Freund verbreitet sich. Wie gehst du damit um?',
    answers: [
      {
        school: 'gryffindor',
        answer:
          'Ich stehe öffentlich zu meinem Freund und verteidige ihn gegen das Gerücht.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich spreche mit meinem Freund, um die Wahrheit herauszufinden, und unterstütze ihn, egal was passiert.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich suche nach Beweisen, die das Gerücht entkräften oder bestätigen, um fair urteilen zu können.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich nutze das Gerücht zu meinem Vorteil, um die Position meines Freundes und meine eigene zu stärken.',
      },
    ],
  },
  {
    question:
      'Deine Gruppe arbeitet an einem schwierigen Projekt. Was ist deine Rolle?',
    answers: [
      {
        school: 'gryffindor',
        answer:
          'Ich motiviere das Team und übernehme die Führung bei der Bewältigung der Herausforderungen.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich sorge dafür, dass alle Meinungen gehört werden und das Team harmonisch zusammenarbeitet.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich bringe mein Fachwissen ein und helfe, komplexe Probleme zu lösen.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich manage die Ressourcen und Strategien, um sicherzustellen, dass unser Projekt erfolgreich ist.',
      },
    ],
  },
  {
    question: 'Wie gehst du mit einem Rückschlag um?',
    answers: [
      {
        school: 'gryffindor',
        answer: 'Ich sehe es als Chance, zu lernen und komme stärker zurück.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich suche Trost und Rat bei meinen Freunden und wir finden gemeinsam eine Lösung. ',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich analysiere, was schiefgelaufen ist, und plane, wie ich es beim nächsten Mal besser machen kann.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich passe meine Strategien an, um sicherzustellen, dass mir ein solcher Fehler nicht noch einmal unterläuft.',
      },
    ],
  },
  {
    question:
      'Du erhältst die Chance, unter einem berühmten Zauberer zu studieren. Was erhoffst du dir davon?',
    answers: [
      {
        school: 'gryffindor',
        answer:
          'Ich freue mich auf die Herausforderungen und die Möglichkeit, meine Grenzen zu testen.',
      },
      {
        school: 'hufflepuff',
        answer:
          'Ich hoffe, Weisheit zu erlangen, die ich zum Wohle anderer einsetzen kann.',
      },
      {
        school: 'ravenclaw',
        answer:
          'Ich bin gespannt auf das Wissen und die Geheimnisse, die ich entdecken werde.',
      },
      {
        school: 'slytherin',
        answer:
          'Ich sehe es als Gelegenheit, mächtige Verbündete zu gewinnen und meinen Einfluss zu erweitern.',
      },
    ],
  },
] as Question[];
