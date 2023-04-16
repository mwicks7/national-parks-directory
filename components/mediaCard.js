import Link from 'next/link'

// export default function Card({ img, title, subtitle, links }) {
//   return (
//     <div className="mdc-card">
//       <div className="my-card__media mdc-card__media mdc-card__media--16-9" style={{backgroundImage: `url("/images/${img}")`}}>
//       </div>
//       <div className="mdc-card-wrapper__text-section">
//         <h2 className="mdc-card__title">{title}</h2>
//         <p className="mdc-card__subtitle">{subtitle}</p>
//         <div className="mdc-card__actions">
//           {links.map(link => (
//             <Link className="mdc-button mdc-card__action mdc-card__action--button" href={link.href}>{link.text}</Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ img, imgHeight=240, title, subtitle, description, links }) {
  return (
    <Card>
      {(title || subtitle) && 
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          {subtitle && 
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          }
        </CardContent>
      }
      
      {img &&
        <CardMedia
          sx={{ height: imgHeight }}
          image={img}
          title={title}
        />
      }

      {description &&
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      }

      {links && 
        <CardActions>
          {links.map(link => (
            <Button size="small" component={ButtonLink} href={link.href}>{link.text}</Button>
          ))}
        </CardActions>
      }
    </Card>
  );
}

const ButtonLink = (props) => <Link {...props}>{props.children}</Link>;
