import { useState } from 'react';

export default function Accordion() {
  const [accordionItems, setAccordionItems] = useState([]);

  const handleCurrentView = (view) => {
    if (accordionItems.includes(view)) {
      setAccordionItems(accordionItems.filter(value => value !== view));
    } else {
      setAccordionItems([...accordionItems, view]);
    }
  };

  return (
    <div>
      <div>
        <div onClick={() => handleCurrentView('html')}>
          HTML{' '}
          <span
            aria-hidden={true}
            className={accordionItems.includes('html') ?
              'accordion-icon accordion-icon--rotated' :
              'accordion-icon'
            }
            
          />
        </div>
        {accordionItems.includes('html') && (
          <div>
            The HyperText Markup Language or HTML is the
            standard markup language for documents designed to
            be displayed in a web browser.
          </div>
        )}
      </div>
      <div>
        <div onClick={() => handleCurrentView('css')}>
          CSS{' '}
          <span
            aria-hidden={true}
            className={accordionItems.includes('css') ?
              'accordion-icon accordion-icon--rotated' :
              'accordion-icon'
            }
          />
        </div>
        {accordionItems.includes('css') && (
          <div>
            Cascading Style Sheets is a style sheet language
            used for describing the presentation of a document
            written in a markup language such as HTML or XML.
          </div>
        )}
      </div>
      <div>
        <div onClick={() => handleCurrentView('js')}>
          JavaScript{' '}
          <span
            aria-hidden={true}
            className={accordionItems.includes('js') ?
              'accordion-icon accordion-icon--rotated' :
              'accordion-icon'
            }
          />
        </div>
        {accordionItems.includes('js') && (
          <div>
            JavaScript, often abbreviated as JS, is a
            programming language that is one of the core
            technologies of the World Wide Web, alongside HTML
            and CSS.
          </div>
        )}
      </div>
    </div>
  );
}
