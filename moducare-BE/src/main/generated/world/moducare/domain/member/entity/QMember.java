package world.moducare.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 1205649133L;

    public static final QMember member = new QMember("member1");

    public final StringPath birth = createString("birth");

    public final ListPath<world.moducare.domain.challengefeed.entity.ChallengeFeed, world.moducare.domain.challengefeed.entity.QChallengeFeed> challengeFeeds = this.<world.moducare.domain.challengefeed.entity.ChallengeFeed, world.moducare.domain.challengefeed.entity.QChallengeFeed>createList("challengeFeeds", world.moducare.domain.challengefeed.entity.ChallengeFeed.class, world.moducare.domain.challengefeed.entity.QChallengeFeed.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final ListPath<world.moducare.domain.diagnosis.entity.DiagnosticResult, world.moducare.domain.diagnosis.entity.QDiagnosticResult> diagnosticResults = this.<world.moducare.domain.diagnosis.entity.DiagnosticResult, world.moducare.domain.diagnosis.entity.QDiagnosticResult>createList("diagnosticResults", world.moducare.domain.diagnosis.entity.DiagnosticResult.class, world.moducare.domain.diagnosis.entity.QDiagnosticResult.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<world.moducare.domain.favorite.entity.Favorite, world.moducare.domain.favorite.entity.QFavorite> favorites = this.<world.moducare.domain.favorite.entity.Favorite, world.moducare.domain.favorite.entity.QFavorite>createList("favorites", world.moducare.domain.favorite.entity.Favorite.class, world.moducare.domain.favorite.entity.QFavorite.class, PathInits.DIRECT2);

    public final StringPath fcmToken = createString("fcmToken");

    public final ListPath<world.moducare.domain.diary.entity.HeadDiary, world.moducare.domain.diary.entity.QHeadDiary> headDiaries = this.<world.moducare.domain.diary.entity.HeadDiary, world.moducare.domain.diary.entity.QHeadDiary>createList("headDiaries", world.moducare.domain.diary.entity.HeadDiary.class, world.moducare.domain.diary.entity.QHeadDiary.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<world.moducare.domain.mychallenge.entity.MyChallenge, world.moducare.domain.mychallenge.entity.QMyChallenge> myChallenges = this.<world.moducare.domain.mychallenge.entity.MyChallenge, world.moducare.domain.mychallenge.entity.QMyChallenge>createList("myChallenges", world.moducare.domain.mychallenge.entity.MyChallenge.class, world.moducare.domain.mychallenge.entity.QMyChallenge.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final ListPath<world.moducare.domain.notification.entity.Notification, world.moducare.domain.notification.entity.QNotification> notifications = this.<world.moducare.domain.notification.entity.Notification, world.moducare.domain.notification.entity.QNotification>createList("notifications", world.moducare.domain.notification.entity.Notification.class, world.moducare.domain.notification.entity.QNotification.class, PathInits.DIRECT2);

    public final StringPath refreshToken = createString("refreshToken");

    public final ListPath<world.moducare.domain.stress.entity.StressResult, world.moducare.domain.stress.entity.QStressResult> stressResults = this.<world.moducare.domain.stress.entity.StressResult, world.moducare.domain.stress.entity.QStressResult>createList("stressResults", world.moducare.domain.stress.entity.StressResult.class, world.moducare.domain.stress.entity.QStressResult.class, PathInits.DIRECT2);

    public final EnumPath<DeviceType> type = createEnum("type", DeviceType.class);

    public final DateTimePath<java.time.ZonedDateTime> updatedAt = createDateTime("updatedAt", java.time.ZonedDateTime.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

